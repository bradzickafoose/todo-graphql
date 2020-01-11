const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
// Use cors package to make requests from other origins
const cors = require('cors');

let todos = [
    {
        id: 0,
        text: 'Build a CRUD Application with React and Apollo GraphQL',
        completed: false,
    },
];



