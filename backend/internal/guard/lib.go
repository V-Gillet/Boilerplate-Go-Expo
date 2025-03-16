package guard

import (
	"errors"
	"os"
	"slices"

	"github.com/V-gillet/backend/internal/guard/role"
	"github.com/V-gillet/backend/internal/services"
	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte(os.Getenv("JWT_SECRET"))

func CheckAuthorization(tokenString *string, authorizedRoles role.Role) error {
	claims := &services.Claims{}
	jwtToken, err := jwt.ParseWithClaims(*tokenString, claims, func(token *jwt.Token) (any, error) {
		return jwtKey, nil
	})

	if err != nil {
		return err
	}

	if !jwtToken.Valid {
		return errors.New("invalid token")
	}

	for _, userRole := range claims.Roles {
		if slices.Contains(authorizedRoles, userRole) {
			return nil
		}
	}

	return errors.New("user does not have the required role")
}
