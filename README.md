<img alt="orbit-logo-white-background-CROPPED" src="https://github.com/user-attachments/assets/0d297193-9209-4486-8fed-a9053e891bb1" style="margin-top: 10px; margin-bottom: -10px;" />
<br/>

![GitHub package.json version](https://img.shields.io/github/package-json/v/oslabs-beta/Orbit)  
![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)

---

## What is Orbit?

**Orbit** is an open-source developer tool for **GraphQL prototyping** and **relational database visualization**.

It helps you go from a PostgreSQL database to a functional GraphQL API in minutes, complete with an interactive diagram, generated schema, and built-in query testing.

Built to save time during API design, database onboarding, or a REST-to-GraphQL migration, Orbit eliminates the need for manual schema mapping and lets you explore data structure visually before you write a single resolver.

📖 Read the full introduction on [Medium](https://ryan-mcdaniel.medium.com/introducing-lexiql-56401bbf8d9e)  
🚀 Accelerated by [OS Labs](https://github.com/oslabs-beta/)

---

## Why use Orbit?

- **Visual Database Explorer** – Instantly understand your schema, including foreign key relationships.
- **Automatic Schema Generation** – Get GraphQL types and resolvers scaffolded from your database metadata.
- **Rapid Prototyping** – Move from database connection to running queries in minutes.
- **Onboarding & Documentation** – Great for introducing new developers to a project’s data model.
- **REST Migration Aid** – Smooth the transition by mapping your existing relational data into a GraphQL API.

---

## Live Demo

You can try Orbit now, no setup required! Visit **[www.orbitdev.io/](https://www.orbitdev.io/)**.

---

## How It Works

### 1. Connect to a Database

- Enter your PostgreSQL connection URI
- Or choose the built-in sample database to explore features immediately

<img src="client/assets/userdbinput.gif" width="700" height="500" /><br />

---

### 2. Visualize Your Data Model

- Interactive ER diagram shows all tables, columns, and data types
- Relationships are highlighted via foreign key links
- Tables can be repositioned for easier viewing and diagram organization

<img src="client/assets/movingtables.gif" width="700" height="500" />

---

### 3. Generate a GraphQL Schema

- Automatically creates `type` definitions and associated resolvers
- Schema view lets you copy the generated code directly into your backend project
- Perfect for kickstarting API development without manual mapping

<img src="client/assets/codemirror.gif" width="700" height="500" />

---

### 4. Test Queries in the Built-in Playground

- Compose GraphQL queries and mutations interactively
- Browse available fields, types, and relationships in the Docs panel
- Test API design decisions against live data

<img src="client/assets/graphiql.gif" width="700" height="500" />

---

## Example Use Cases

- **Prototyping a new API** – Start with your existing database, quickly visualize and generate the schema.
- **Onboarding new engineers** – Give them a visual map of the data model plus a live query playground.
- **Transitioning from REST** – Map relational tables into GraphQL types without manual boilerplate.
- **Database exploration** – Use the sample DB to learn GraphQL or demo concepts.

---

## Tech Stack

- **Frontend**: React, React Flow for diagram rendering
- **Backend**: Node.js, Express, PostgreSQL
- **Other**: GraphQL, Webpack, Docker

---

## Developers

- Christopher Carney – [@Carthanial](https://github.com/Carthanial)
- Stacy Learn – [@hello-stacy](https://github.com/hello-stacy)
- John Li – [@john-li7](https://github.com/john-li7)
- Ryan McDaniel – [@ryanmcd118](https://github.com/ryanmcd118)

---

## License

Licensed under the [MIT License](LICENSE).
