package schema

import "gorm.io/gorm"

func Migrate(db *gorm.DB) error {
	return db.AutoMigrate(
		// set here all the models
		&User{},
	)
}
