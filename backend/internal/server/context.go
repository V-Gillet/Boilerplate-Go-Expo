package server

import (
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type Context struct {
	Db     *gorm.DB
	Logger *zap.Logger
}
