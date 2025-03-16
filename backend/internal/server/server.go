package server

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/V-gillet/backend/internal/middleware"

	_ "github.com/joho/godotenv/autoload"
)

type Server struct {
	port int
}

func NewServer(router http.Handler, ctx Context) *http.Server {
	port, _ := strconv.Atoi(os.Getenv("PORT"))
	NewServer := &Server{
		port: port,
	}

	// Declare Server config
	server := &http.Server{
		Addr:         fmt.Sprintf("0.0.0.0:%d", NewServer.port),
		Handler:      middleware.Logger(router, ctx.Logger),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	return server
}
