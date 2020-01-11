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

// Add resolvers
// Resolvers are functions that run when queries and mutations are made.
// This is where we fetch and manipulate the data that's returned to the client.
// Mutations receive 4 arguments, but of particular interest is args, which contains the data passed from the client
// We use that data to manipulate the array of todos and return a result.
const resolvers = {
    Query: {
        todos: () => todos,
    },
    Mutation: {
        createTodo: (parent, args, context, info) => {

            return todos.push({
                id: Date.now().toString(),
                text: args.text,
                completed: false,
            });
        },
        removeTodo: (parent, args, context, info) => {
            for (let i in todos) {
                if (todos[i].id === args.id) {
                    todos.splice(i, 1);
                }
            }
            return args.id
        }
    }
};

// Pass the type definitions and resolvers to create ApolloServer
// Use cors() to allow cross-origin requests
// Serve app on port

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.use(cors());

const port = process.env.PORT || 4000;

app.listen(port, () =>
    console.log(`***********SERVER UP ON ${port}************`))
