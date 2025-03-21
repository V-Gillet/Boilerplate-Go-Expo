package router

import (
	"fmt"
	"net/http"

	"github.com/V-gillet/backend/internal/middleware"
)

func Group(router *http.ServeMux, prefix string, handler func(r *http.ServeMux), middlewares ...func(next http.Handler) http.Handler) *http.ServeMux {
	subRouter := http.NewServeMux()
	handler(subRouter)

	router.Handle(
		fmt.Sprintf("%s/", prefix),
		middleware.ChainMiddleware(http.StripPrefix(prefix, subRouter), middlewares...),
	)

	return router
}
