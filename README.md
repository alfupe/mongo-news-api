# Restful CRUD API with Node, Express and MongoDB

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the server in the production mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

## Available Endpoints
| Endpoint                  | Method | Description                                    |
|:--------------------------|:-------|:-----------------------------------------------|
| `/api/articles`           | POST   | Create a new Article                           |
| `/api/articles/:id`       | PUT    | Update a Article with id                       |
| `/api/articles/published` | GET    | Retrieve all published (not archived) Articles |
| `/api/articles/archived`  | GET    | Retrieve all archived Articles                 |
| `/api/articles`           | GET    | Retrieve all Articles                          |
| `/api/articles/:id`       | GET    | Retrieve a single Article with id              |
| `/api/articles/:id`       | DELETE | Delete a Article with id                       |
| `/api/articles`           | DELETE | Delete all Articles from the database          |
