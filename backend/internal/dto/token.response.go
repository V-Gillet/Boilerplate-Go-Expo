package dto

import "github.com/V-gillet/backend/internal/guard/role"

type TokenResponse struct  {
	Token string    `json:"token"`
	Roles role.Role `json:"roles"`
}