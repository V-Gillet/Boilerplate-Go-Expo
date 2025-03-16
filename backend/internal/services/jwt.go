package services

import (
	"os"
	"time"

	"github.com/V-gillet/backend/internal/dto"
	"github.com/V-gillet/backend/internal/guard/role"
	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte(os.Getenv("JWT_SECRET"))

type Claims struct {
	Email string    `json:"email"`
	Roles role.Role `json:"roles"`
	jwt.RegisteredClaims
}

func GenerateToken(args dto.LoginArgsRequest, roles []string) (*string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		Email: args.Email,
		Roles: roles,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)

	return &tokenString, err
}
