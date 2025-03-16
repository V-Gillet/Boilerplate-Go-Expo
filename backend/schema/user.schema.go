package schema

import (
	"time"
)

type User struct {
	ID           uint
	Firstname    string
	Lastname     string
	Password     string
	Pseudo       string
	Email        string `gorm:"unique"`
	Age          uint8 
	StreetNumber int16
	Address      string
	PostCode     int32
	Birthday     time.Time // Automatically managed by GORM for creation time
	CreatedAt    time.Time
	UpdatedAt    time.Time
	Roles        []string `gorm:"serializer:json;type:jsonb;default:'[\"ROLE_USER\"]'"`
}
