# ERD Any.do

## Storage

- We'll use a NoSQL database (MongoDB). MongoDB is a tool that can manage document-oriented information, store or retrieve information.

## Schema

We'll need at least the following documents to implement the service:

**Users**
| FIELD | TYPE |
|--------|------|
| name | String |
| email | String(unique) |
| password | String |
| confirmPassword | String |
| avatar | String |

<br/>

**Tasks**
| FIELD | TYPE |
|--------|------|
| task | String |
| notes | String |
| completed | Boolean |
| user | ref(Users) |
| tags | [ref(Tags)] |
| subTasks | [ref(SubTasks)] |

<br/>

**SubTasks**
| FIELD | TYPE |
|--------|------|
| subtask | String |
| task | ref(Tasks) |

<br/>

**Lists**
| FIELD | TYPE |
|--------|------|
| name | String|
| tasks | [ref(Tasks)] |

<br/>

**Tags**
| FIELD | TYPE |
|--------|------|
| name | String |
| color | String |

## Server

A simple HTTP server is responsible for authentication, serving stored data, and potentially ingesting and serving analytics data.

- Node.js is selected for implementing the server for speed of development.
- Express.js is the web server framework.
- MongoDB NoSQL database.
- Mongoose as [ORM](https://medium.com/@julianam.tyler/what-is-the-difference-between-odm-and-orm-267bbb7778b0).

### Auth

We'll use JWT to implement authentication and authorization system or social login like (Google, Facebook, Github).

### API

We will build Api as [REST API](https://medium.com/edureka/what-is-rest-api-d26ea9000ee6).

**Auth**

```
/signIn  [POST]
/signUp  [POST]
/signOut [POST]
/forgetPassword [POST]
/resetPassword [POST]
```

## Clients

- The web client will be implemented in **_React.js_**.
- We are going to use **_Redux Toolkit_** for state management.

## Hosting

The code will be hosted on GitHub.
