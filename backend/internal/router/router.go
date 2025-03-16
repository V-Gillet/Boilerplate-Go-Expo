package router

import (
	"net/http"

	"github.com/V-gillet/backend/internal/controller"
	"github.com/V-gillet/backend/internal/middleware"
	"github.com/V-gillet/backend/internal/server"
)

func ServeRoutes(ctx server.Context) http.Handler {
	router := http.NewServeMux()
	c := controller.NewBaseController(ctx)

	router.HandleFunc("/health", c.HealthCheck)

	Group(router, "/api/v1", func(v1 *http.ServeMux) {
		v1.HandleFunc("/hello", c.HelloWorld)
		v1.HandleFunc("/signup", c.Signup)
		v1.HandleFunc("POST /login", c.Login)
		// other routes here
	}, middleware.ApiKeyMiddleware, middleware.CORSMiddleware, middleware.WithHeaders) // can set middleware here

	return router
}
