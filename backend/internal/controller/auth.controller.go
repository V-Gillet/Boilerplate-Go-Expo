package controller

import (
	"net/http"

	"golang.org/x/crypto/bcrypt"

	"github.com/V-gillet/backend/internal/assert"
	"github.com/V-gillet/backend/internal/dto"
	"github.com/V-gillet/backend/internal/guard"
	"github.com/V-gillet/backend/internal/guard/role"
	"github.com/V-gillet/backend/internal/repository"
	"github.com/V-gillet/backend/internal/services"
	"github.com/V-gillet/backend/schema"
)

type SignupArgs struct {
	User schema.User `json:"user"`
}

func (c *BaseController) Login(w http.ResponseWriter, r *http.Request) {
	var args dto.LoginArgsRequest
	if err := c.BindJsonBody(r, &args); err != nil {
		c.JsonReponse(w, http.StatusInternalServerError, c.CreateMessage("Failed to parse request body"))
		return
	}

	err := assert.Required(args, []string{"Email", "Password"})
    if err != nil {
        c.JsonReponse(w, http.StatusBadRequest, c.CreateMessage(err.Error()))
        return
    }

	err= assert.Email(args.Email)
	if err != nil {
        c.JsonReponse(w, http.StatusBadRequest, c.CreateMessage(err.Error()))
        return
    }

	user, err := repository.GetUserByEmail(c.ctx.Db, args.Email)
	if err != nil {
		c.JsonReponse(w, http.StatusInternalServerError, c.CreateMessage("Failed to get user"))
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(args.Password)); err != nil {
		c.JsonReponse(w, http.StatusUnauthorized, c.CreateMessage("Invalid password"))
		return
	}

	tokenString, err := services.GenerateToken(args, user.Roles)
	if err != nil {
		c.JsonReponse(w, http.StatusInternalServerError, c.CreateMessage("Failed to create token"))
		return
	}

	if err := guard.CheckAuthorization(tokenString, role.Role{"ROLE_USER"}); err != nil {
		c.JsonReponse(w, http.StatusUnauthorized, c.CreateMessage("User does not have the required role"))
		return
	}

	response := dto.TokenResponse{
		Token: *tokenString,
		Roles: user.Roles,
	}

	c.JsonReponse(w, http.StatusOK, response)
}

func (c *BaseController) Signup(w http.ResponseWriter, r *http.Request) {
	var args SignupArgs
	if err := c.BindJsonBody(r, &args); err != nil {
		c.JsonReponse(w, http.StatusInternalServerError, c.CreateMessage("Failed to parse request body"))
		return
	}

	err := assert.Required(args.User, []string{"Firstname","Lastname","Pseudo","Password","Email", "Age","StreetNumber","Address","PostCode","Birthday"})
    if err != nil {
        c.JsonReponse(w, http.StatusBadRequest, c.CreateMessage(err.Error()))
        return
    }

	err = assert.Email(args.User.Email)
	if err != nil {
        c.JsonReponse(w, http.StatusBadRequest, c.CreateMessage(err.Error()))
        return
    }
	
	err = assert.Password(args.User.Password)
	if err != nil {
        c.JsonReponse(w, http.StatusBadRequest, c.CreateMessage(err.Error()))
        return
    }

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(args.User.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JsonReponse(w, http.StatusInternalServerError, c.CreateMessage("Failed to hash password"))
		return
	}

	args.User.Password = string(hashedPassword)

	if err := repository.CreateUser(c.ctx.Db, &args.User); err != nil {
		c.JsonReponse(w, http.StatusInternalServerError, c.CreateMessage("Failed to save user"))
		return
	}

	c.JsonReponse(w, http.StatusCreated, c.CreateMessage("User created successfuly"))
}
