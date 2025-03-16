package repository

import (
	"log"

	"github.com/V-gillet/backend/schema"
	"gorm.io/gorm"
)

func GetUserByEmail(dbPool *gorm.DB, email string) (*schema.User, error) {
	var user schema.User
	if err := dbPool.Where("email = ?", email).First(&user).Error; err != nil {
		log.Println(err)

		return nil, err
	}

	return &user, nil
}

func CreateUser(dbPool *gorm.DB, user *schema.User) error {
	if err := dbPool.Create(user).Error; err != nil {
		log.Println(err)

		return err
	}

	return nil
}
