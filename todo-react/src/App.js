import React from 'react';
import './App.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// define all the queries and mutations
const READ_TODOS = gql`
  query todos{
    todos {
      id
      text
      completed
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($text: String!) {
    createTodo(text: $text)
  }
`;

const REMOVE_TODO = gql`
  mutation RemoveTodo($id: String!) {
    removeTodo(id: $id)
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!) {
    updateTodo(id: $id)
  }
`;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
