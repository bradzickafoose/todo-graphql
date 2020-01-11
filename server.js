const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
// Use cors package to make requests from other origins
const cors = require('cors');

// Setup an array to store todos
let todos = [
    {
        id: 0,
        text: 'Build a CRUD Application with React and Apollo GraphQL',
        completed: false,
    },
];

// Define a schema called Todo
// Define query. The (!) signifies that it will always return something.
// Think of a query as the way you fetch data from the GraphQL server. It's like a GET request in REST.
// Define mutations. A mutation is a way to update data on the server.
// First mutation, createTodo, accepts one parameter, text, which must be a String. It returns a string after it's finished.
// The second mutation, removeTodo, does the same.
const typeDefs = gql`
    type Todo {
        id: String
        text: String
        completed: Boolean
    }
    type Query {
        todos: [Todo]!
    }
    type Mutation {
        createTodo(text: String!):String
        removeTodo(id: String!)
    }
`;

