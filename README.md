# Screen Rate

A simple movie review web application, work in progress.

## Usage

Clone and install backend

```bash
git clone https://github.com/mg86837242/screenrate-server
npm install
```

Install MongoDB Compass, create a new collection called `movies` and import dataset from the JSON file located in the `screenrate-server\data` directory

Make sure Java and Maven are installed

```bash
mvn --version
```

Open any IDE, e.g., Intellij, to configure environment variables, referring to the `.env.example`, then start the backend server at http://localhost:8080, if using Spring Boot's default port number

Clone and install frontend

```bash
git clone https://github.com/mg86837242/screenrate-client
npm install
```

Configure environment variables, referring to the `.env.example` file

```bash
npm run dev
```

Navigate to the http://localhost:5173, if using the Vite's default port number

## Technology Highlights

- MongoDB
- Spring Boot
- React
- TypeScript
- Material UI
- Axios

## Credit

- [Full Stack Development with Java Spring Boot, React, and MongoDB – Full Course](https://www.youtube.com/watch?v=5PdEmeopJVQ)
