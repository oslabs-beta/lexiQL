<img src="https://user-images.githubusercontent.com/77026961/114807368-4be50700-9d74-11eb-9af3-af87cd74c9e1.png" style="margin-top: 10px; margin-bottom: -10px;">
<br/>

![GitHub package.json version](https://img.shields.io/github/package-json/v/oslabs-beta/lexiQL) ![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat) ![Tweet](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Flexiql)


lexiQL is an open-source GraphQL prototyping tool that visualizes your relational database and facilitates GraphQL API prototyping and configuration, allowing developers to to optimize their queries and transition away from RESTful APIs. The tool takes a relational database input and uses it to generate the respective GraphQL schemas alongside an interactive GUI that displays all of the tables in a database, including primary/foreign key relationships between tables, as well as each table’s columns and associated data types. <br/><br/>
Accelerated by <a href="https://github.com/oslabs-beta/" />OS Labs</a>.

<hr />

## Getting Started
### Visit www.lexiql.io to utilize the tool.
#### Visit www.lexiql.io to utilize the tool.
<b> Visit www.lexiql.io to utilize the tool. </b>

#### Select your database
* Input your PostgreSQL URI
* OR use the sample database to view data rendered in an interactive diagram.

<img src="client/assets/userdbinput.gif" width="700" height="500" /><br />

#### View your relational database
* Easily view the relationships between the tables via the links that highlight the foreign key constraints.
* Move any table and arrange them to optimally view the structure of the database and the relationships between the tables.
  
<img src="client/assets/movingtables.gif" width="700" height="500" />

#### View your GQL schema
* View the generated GraphQL schema, including the types and associated resolvers.
* Use the copy button to effortlessly integrate the code into your project.

<img src="client/assets/codemirror.gif" width="700" height="500" />

#### Test the GQL schema
* Interactively construct full queries using the sample database.
* Use the "Docs" to explore the possible queries, fields, types, mutations, and more.

<img src="client/assets/graphiql.gif" width="700" height="500" />

## Developers
* Christopher Carney – [@Carthanial](https://github.com/Carthanial) <br/>
* Stacy Learn – [@hello-stacy](https://github.com/hello-stacy)  <br/>
* John Li – [@john-li7](https://github.com/john-li7)  <br/>
* Ryan McDaniel – [@ryanmcd118](https://github.com/Cryanmcd118) 

## License 
This product is licensed under the MIT License.
