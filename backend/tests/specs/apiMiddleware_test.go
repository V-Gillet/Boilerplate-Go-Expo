package specs

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/V-gillet/backend/internal/controller"
	"github.com/V-gillet/backend/internal/middleware"
	"github.com/V-gillet/backend/internal/server"
)

func TestApiKeyMiddlewareOK(t *testing.T) {
	// set api key env variable
	os.Setenv("API_KEY", "MY_SECRET_API_KEY")

	// get the base controller
	c := controller.NewBaseController(server.Context{Db: nil, Logger: nil})

	// Set the api key around healthcheck handler and launch the server
	server := httptest.NewServer(middleware.ApiKeyMiddleware(http.HandlerFunc(c.HealthCheck)))
	defer server.Close()

	client := &http.Client{}
	req, err := http.NewRequest("GET", server.URL, nil)
	if err != nil {
		t.Fatalf("error making request to server. Err: %v", err)
	}

	req.Header.Set("X-API-KEY", "MY_SECRET_API_KEY")

	resp, err := client.Do(req)
	if err != nil {
		t.Fatalf("error making request to server. Err: %v", err)
	}
	defer resp.Body.Close()

	// Assertions
	if resp.StatusCode != http.StatusOK {
		t.Errorf("expected status Ok; got %v", resp.Status)
	}
	var body struct {
		Message string `json:"message"`
	}
	decoder := json.NewDecoder(resp.Body)
	err = decoder.Decode(&body)
	if err != nil {
		t.Fatalf("error pasring the body. Err: %v", err)
	}
	if body.Message != "I'm alive" {
		t.Errorf("expected response body to be %v; got %v", "I'm alive", body.Message)
	}
}

func TestApiKeyMiddlewareNotOK(t *testing.T) {
	// remove api key env variable
	os.Setenv("API_KEY", "WRONG_API_KEY")

	// get the base controller
	c := controller.NewBaseController(server.Context{Db: nil, Logger: nil})

	// Set the api key around healthcheck handler and launch the server
	server := httptest.NewServer(middleware.ApiKeyMiddleware(http.HandlerFunc(c.HealthCheck)))
	defer server.Close()
	client := &http.Client{}
	req, err := http.NewRequest("GET", server.URL, nil)
	if err != nil {
		t.Fatalf("error making request to server. Err: %v", err)
	}

	req.Header.Set("X-API-KEY", "MY_SECRET")

	resp, err := client.Do(req)
	if err != nil {
		t.Fatalf("error making request to server. Err: %v", err)
	}
	defer resp.Body.Close()

	// Assertions
	if resp.StatusCode != http.StatusUnauthorized {
		t.Errorf("expected status Unauthorized; got %v", resp.Status)
	}
}
