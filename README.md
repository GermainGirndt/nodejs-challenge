# NodeJS - Challenge
RocketSeat BootCamp - NodeJS Challenge

## Features
* Backend Node App
* Runs an fully working API using Express
* Returns 'ERROR 404 - BAD REQUEST' for requests with invalid id
* Receives request for:
  * (GET - '/repositories') - Show the current repositories
  * (POST - '/repositories') - Create new repository with passed in title, url, techs and adds automatically a new id (UUID) and a like count starting at 0. 
  * (POST - '/repositories/:id/like') - Add one more like to the repository's like count by ID 
  * (PUT - '/repositories/:id') - Updates the by user modifiable data
  * (DELETE - '/repositories/:id') - Delete repo by ID 
