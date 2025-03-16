package controller

import (
	"net/http"

	"github.com/V-gillet/backend/internal/guard"
	"github.com/V-gillet/backend/internal/guard/role"
)

func (c *BaseController) HelloWorld(w http.ResponseWriter, r *http.Request) {
	tokenString := r.Header.Get("Authorization")
	if err := guard.CheckAuthorization(&tokenString, role.Role{"ROLE_USER"}); err != nil {
		c.JsonReponse(w, http.StatusUnauthorized, c.CreateMessage(err.Error()))
		return
	}

	c.JsonReponse(w, http.StatusOK, c.CreateMessage("Hello, World!"))
}
