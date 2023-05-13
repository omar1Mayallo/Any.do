# ERD Any.do

## ERD(Engineering Requirements Document)

### What Is The ERD ?

- An engineering requirements document (ERD) is a statement describing the goal and purpose of a new component. Unlike a product requirements document (PRD), which tells engineers what they need to build, an ERD specifies why a part is being built and how its design fuels its purpose. By following the engineering requirements outlined in an ERD, engineers can ensure that the part they build will satisfy customer needs.
  **you can read more about ERD from [here](https://www.fastradius.com/resources/how-to-write-an-engineering-requirements-document/).**

## Storage

- We'll use a [NoSQL](https://www.techtarget.com/searchdatamanagement/definition/MongoDB) database [MongoBD](https://www.mongodb.com) is quite useful for working with large sets of distributed data. MongoDB is a tool that can manage document-oriented information, store or retrieve information. MongoDB is used for high-volume data storage, helping organizations store large amounts of data while still performing rapidly. Organizations also use MongoDB for its ad-hoc queries, indexing, load balancing, aggregation, server-side JavaScript execution and other features.

### Schema

We'll need at least the following documents to implement the service:

**Users**:
| Column | Type |
|--------|------|
| Name | STRING |
| Email | STRING(Unique) |
| Photo | STRING |
| Password | STRING |
| Confirm Password | STRING |

We'll need at least the following entities to implement the service:

## Server

1-A simple HTTP server is responsible for authentication, serving stored data, and
potentially ingesting and serving analytics data.

- Node.js is selected for implementing the server for speed of development.
- Express.js is the web server framework.
- NoSQL database(MongoDB).

## Auth

We'll use [JWT](https://jwt.io/) to implement Authentication and Authorization system or social login like (Google, Facebook, Github).

### API

**Auth**

```
/signIn  [POST]
/signUp  [POST]
/signOut [POST]
```

**Tasks**

```
/tasks/list [GET]
/tasks/new  [POST]
/tasks/:id  [GET]
/tasks/:id  [PUT]
/tasks/:id  [DELETE]
```

## Clients

1- The web client will be implemented in **_React.js_**.
2- We are going to use **_Redux Toolkit_** for state managment.
3-Uses **_Bootstrap_** for building the CSS components.

## Hosting

The code will be hosted on Github

- The web client will be hosted using any free web hosting platform such as firebase
  or netlify. A domain will be purchased for the site, and configured to point to the
  web host's server public IP.
