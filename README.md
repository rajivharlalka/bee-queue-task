# Bee-Queue Task

Node Backend that serves API endpoints that are more busy using a task queue([bee-queue](https://github.com/bee-queue/bee-queue)). The backend is written using Express Framework and MongoDB as it's Primary database. A Redis Instance is consumed by the queue to maintain the tasks.

## Pre-Requisites

The following environments must be needed in order to run the server.

- nodejs >=14.0.0
- yarn (Package Manager) 1.22
- Redis_URL
- MONGO_URL
- [Twitter Developer Bearer Token](https://developer.twitter.com/en/docs/twitter-api)

## Manual Installation

Clone the repo:

```bash
git clone --depth 1 https://github.com/rajivharlalka/bee-queue-task.git
cd bee-queue-task
npx rimraf ./.git
```

Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env.example .env
# open .env and modify the environment variables (if needed)
```

Main API

- `/v1/auth/register` POST - Register a User onto the platform

```md
@body
username - String
password - String
email - string
```

- `/v1/auth/login` POST - Login into the system

```md
@body
email - String
password - String
```

- `/v1/tasks/createTask` GET - Fetch Latest Tweets

```md
@header
Authentication- Bearer {access_token}
```

- `/v1/tasks/listTask` GET - Get a list of all(pending/completed/failed) tasks

```md
@header
Authentication - Bearer {access_token}

@params
page number - Page Number
sortBy field_name - name of field to sort the response
limit number - Number of tasks to get in one response
job_id number - get status of a particular job_id
status string(failed/succeeded/created) - get all tasks with a fixed status
```

- `/v1/tasks/CompletedTask` GET - Get a list of Succeeded tasks

```md
@header
Authentication - Bearer {access_token}
```

- This Project has been made using a boiler plate template which can be found [here](https://github.com/hagopj13/node-express-boilerplate)
