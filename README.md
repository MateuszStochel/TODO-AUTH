# TODO-AUTH

#### Setup
1. Navigate to server folder and create .env with test data: 
```bash
MONGO_URL=mongodb+srv://test:testuser@nodeexpressprojects.qucwcf5.mongodb.net/auth-CRUD?retryWrites=true&w=majority
JWT_SECRET=jwtTestSecret
JWT_LIFETIME=1d
```

- cd front-end / npm install
- cd server / npm install


#### Run application
1. Running on local (npm start front-end / server)

```bash
npm start
```

2. Running with DOCKER
- In package.json change "proxy" to "http://backend:5000"
- Build the Docker containers
```bash
docker-compose build
```
- Start the Docker containers
```bash
docker-compose up
```

