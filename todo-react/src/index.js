import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

// Create ApolloClient and pass in the endpoint of the GraphQL server
const client = new ApolloClient({
    uri: "http://localhost:4000/graphql"
});

// Wrap the app with ApolloProvider which will expose the client throughout the app
ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));

serviceWorker.register();