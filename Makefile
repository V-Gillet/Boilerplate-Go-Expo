build: build-backend build-frontend
watch: start-backend start-frontend

build-backend:
	docker compose build

build-frontend:
	cd frontend && npm install

start-backend:
	docker compose up -d

start-frontend:
	cd frontend && npm start --clear

stop-backend:
	docker compose down