package middleware

import (
	"context"
	"net/http"
)

type ServerContextKey string

// WithHeaders is a middleware function that wraps an existing http.Handler.
// It adds specific headers from the incoming HTTP request to the request context.
//
// Parameters:
// - base: the original http.Handler to be wrapped.
//
// Returns:
// - An http.Handler that processes the request with the added headers in the context.
func WithHeaders(base http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()

		ctx = context.WithValue(ctx, ServerContextKey("route"), r.URL.Path)
		ctx = context.WithValue(ctx, ServerContextKey("user-agent"), r.Header.Get("User-Agent"))
		ctx = context.WithValue(ctx, ServerContextKey("x-forwarded-for"), r.Header.Get("X-Forwarded-For"))
		ctx = context.WithValue(ctx, ServerContextKey("remote-addr"), r.Header.Get("Remote-Addr"))
		ctx = context.WithValue(ctx, ServerContextKey("Authorization"), r.Header.Get("Authorization"))

		r = r.WithContext(ctx)

		base.ServeHTTP(w, r)
	})
}
