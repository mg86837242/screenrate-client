# Screen Rate

A simple movie review web application, work in progress.

## Usage

Clone and install backend

```bash
git clone https://github.com/mg86837242/screenrate-server
npm install
```

Install MongoDB Compass, create new collections called `movies` and `reviews` and then import dataset from the JSON file located in the `screenrate-server\db` directory to their respective collections

Make sure Java and Maven are installed, for example, by using following commands:

```bash
java --version
mvn --version
```

Open any IDE, e.g., Intellij, to configure environment variables, referring to the `.env.example`, then start the backend server at http://localhost:8080, if using Spring Boot's default port number

Clone and install frontend

```bash
git clone https://github.com/mg86837242/screenrate-client
npm install
```

Configure environment variables for the frontend, referring to the `.env.example` file, then start the backend server at http://localhost:5173, if using Vite's default port number

```bash
npm run dev
```

Navigate to the http://localhost:5173, if using the Vite's default port number

## Technology Highlights

- MongoDB
- Java
- Spring Boot
- TypeScript
- React
- Material UI
- Styled Components
- Axios
- TanStack/React Query
- React Router

## Credit

- [Full Stack Development with Java Spring Boot, React, and MongoDB – Full Course](https://www.youtube.com/watch?v=5PdEmeopJVQ)
