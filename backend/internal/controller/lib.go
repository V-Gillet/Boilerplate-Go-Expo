package controller

import (
	"encoding/json"
	"net/http"

	"github.com/V-gillet/backend/internal/server"
	"gorm.io/gorm"
)

type BaseController struct {
	ctx server.Context
}

type Context struct {
	db *gorm.DB
}

type DefaultMessage struct {
	Message string `json:"message"`
}

func NewBaseController(ctx server.Context) *BaseController {
	return &BaseController{
		ctx,
	}
}

func (c *BaseController) JsonReponse(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	json.NewEncoder(w).Encode(data)
}

func (c *BaseController) BindJsonBody(r *http.Request, body interface{}) error {
	if r.Body == nil {
		return nil
	}

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(body)
	if err != nil {
		return err
	}

	return nil
}

func (c *BaseController) CreateMessage(message string) DefaultMessage {
	return DefaultMessage{
		Message: message,
	}
}

func (c *BaseController) HealthCheck(w http.ResponseWriter, r *http.Request) {
	c.JsonReponse(w, http.StatusOK, c.CreateMessage("I'm alive"))
}
