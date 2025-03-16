package main

import (
	"log"
	"os"

	"github.com/V-gillet/backend/internal/config/db"
	"github.com/V-gillet/backend/internal/router"
	"github.com/V-gillet/backend/internal/server"
	"github.com/V-gillet/backend/schema"
	"go.uber.org/zap"
)

type ContextKey string

func main() {
	logger, _ := zap.NewProduction()
	if os.Getenv("GO_ENV") == "development" {
		logger, _ = zap.NewDevelopment()
	}
	defer logger.Sync()

	if os.Getenv("GO_ENV") == "development" {
		logger.Sugar().Info("⚠️ Caution : The server will be running under development mode 🔨🔨")
	}

	dbPool, err := db.DatabaseConnect()
	if err != nil {
		logger.Sugar().Fatalf("Error connecting to the database: %v", err)
	}

	err = schema.Migrate(dbPool)
	if err != nil {
		log.Fatalf("Error migrating the database: %v", err)
	}

	ctx := server.Context{
		Db:     dbPool,
		Logger: logger,
	}

	r := router.ServeRoutes(ctx)
	server := server.NewServer(r, ctx)

	logger.Sugar().Infof("🚀 Server running on port %s\n", server.Addr)
	err = server.ListenAndServe()
	if err != nil {
		logger.Sugar().Fatalf("Error starting server: %v", err)
	}
}
