const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// init express
const app = express();
app.use(express.json());
app.use(cors());

// repo for RAM storge
const repositories = [];

// List
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

// Create
app.post("/repositories", (request, response) => {
  // Create new id and likes
  const id = uuid();
  const likes = 0;

  // Extract objs from request
  const { title, url, techs } = request.body;

  // Create and store new Repo
  const newRepository = { id, title, url, techs, likes };
  repositories.push(newRepository);

  return response.json(newRepository);
});

// Add like
app.post("/repositories/:id/like", (request, response) => {
  // Get request id
  const { id } = request.params;

  // Search for matching ID within the Repositories
  const repositoryId = repositories.findIndex(
    (repository) => repository.id === id
  );

  // Return Bad Request if doesn't exist
  if (repositoryId < 0) {
    return response.status(400).json({ error: "Bad Request" });
  }

  // Add one more like to the count
  repositories[repositoryId]["likes"]++;

  return response.status(200).json(repositories[repositoryId]);
});

// Update
app.put("/repositories/:id", (request, response) => {
  // Extract objs from request
  const { title, url, techs } = request.body;
  const { id } = request.params;

  // Search for matching ID within the Repositories
  const repositoryId = repositories.findIndex(
    (repository) => repository.id == id
  );

  // Return Bad Request, if doesn't exist
  if (repositoryId < 0) {
    return response.status(400).json({ error: "Bad Request" });
  }

  // Repeat the current repository's data, actualizing the new ones
  repositories[repositoryId] = {
    ...repositories[repositoryId],
    title,
    url,
    techs,
  };

  return response.status(200).json(repositories[repositoryId]);
});

// Delete
app.delete("/repositories/:id", (request, response) => {
  // Extract id from Request
  const { id } = request.params;

  // Search for matching ID within the Repositories
  const repositoryId = repositories.findIndex(
    (repository) => repository.id == id
  );

  // Return Bad Request if doesn't exist
  if (repositoryId < 0) {
    return response.status(400).json({ error: "Bad Request" });
  }

  // Remoove the repository by object's id
  repositories.splice(repositoryId, 1);

  return response.status(204).json();
});

module.exports = app;
