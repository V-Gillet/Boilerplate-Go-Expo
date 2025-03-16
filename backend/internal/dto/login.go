package dto

type LoginArgsRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
