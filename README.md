# Apply Artifakt

Make an API using `express` and a frontend using the framework of your choice.

## API
Create a REST or GraphQL API using `express` for the `project` resource following these specs:
- `id`: An uuid auto generated.
- `name`: A string required editable with a maximum length of 64 chars.
- `code`: An alphanumeric **unique** string required uneditable with a maximum length of 64 chars.
- `created_at`: The creation timestamp of the project.

Your API must have 5 available actions :
- List all projects
- Get a single project using its `id`
- Create a project with `name` and `code`
- Update a project `name` using its `id`
- Delete a project using its `id`

## Frontend
Create a frontend using the web framework of your choice.
Your frontend must have :
- A grid which shows all the projects
- A form with 2 fields (`name` and `code`) to create a project.
- A form with 1 field (`name`) to update a project.
- An action to delete a project.

## Project setup

- **Server**: instructions [here](server/README.md)
- **Client**: instructions [here](client/README.md)
