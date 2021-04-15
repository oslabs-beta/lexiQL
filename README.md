# lexiQL

![logo](https://user-images.githubusercontent.com/77026961/114807368-4be50700-9d74-11eb-9af3-af87cd74c9e1.png)

<i>lexiQL</i> is an open-source GraphQL prototyping tool that visualizes your relational database and facilitates GraphQL API prototyping and configuration, allowing developers to to optimize their queries and transition away from RESTful APIs. The tool takes a relational database input and uses it to generate the respective GraphQL schemas alongside an interactive GUI that displays all of the tables in a database, including primary/foreign key relationships between tables, as well as each table’s columns and associated data types. 

<hr />

## Getting Started
Visit www.lexiql.io to utilize the tool.

#### Select your database
  1. [ ] Input your PostgreSQL URI
  2. [ ] OR use the sample database to view data rendered in an interactive diagram.

![selectDBdemo](client/assets/userdbinput.gif)

#### View your relational database
  1. [ ] Easily view the relationships between the tables via the links that highlight the foreign key constraints.
  2. [ ] Move any table and arrange them to optimally view the structure of the database and the relationships between the tables.

![visualizerdemo](client/assets/movingtables.gif)

#### View your GQL schema
  1. [ ] View the generated GraphQL schema, including the types and associated resolvers.
  2. [ ] Use the copy button to effortlessly integrate the code into your project.

![visualizerdemo](client/assets/codemirror.gif)

#### View your GQL schema
  1. [ ] Interactively construct full queries using the sample database.
  2. [ ] Use the "Docs" to explore the possible queries, fields, types, mutations, and more.

![visualizerdemo](client/assets/graphiql.gif)

## Developers
* Christopher Carney – [@Carthanial](https://github.com/Carthanial) <br/>
* Stacy Learn – [@hello-stacy](https://github.com/hello-stacy)  <br/>
* John Li – [@john-li7](https://github.com/john-li7)  <br/>
* Ryan McDaniel – [@ryanmcd118](https://github.com/Cryanmcd118) 

## License 
This product is licensed under the MIT License.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/open-source-labs/Swell/blob/master/LICENSE.txt)
[![Build Status](https://travis-ci.org/open-source-labs/Swell.svg?branch=master)](https://travis-ci.org/open-source-labs/Swell)
![GitHub package.json version](https://img.shields.io/github/package-json/v/open-source-labs/Swell?color=blue)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/getswell/getswell/issues)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Swell-%20For%20all%20your%20streaming%20API%20testing%20needs&url=https://www.getswell.io&hashtags=SSE,WebSocket,HTTP,API,developers)
