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

  // useQuery to read todos from the server
  // Use object destructuring to get data, loading, error which is used to update the UI
  const { data, loading, error } = useQuery(READ_TODOS);

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error reading todos</p>;
  if (!data) return <p>Not todos found</p>;

  return (
    <div className="App">
      <h3>Create New Todo</h3>
      <form onSubmit={}>
        <input className="form-control" type="text" placeholder="Enter todo"></input>
        <button className="btn btn-primary" type="submit">Add</button>
      </form>
      <ul>
        {data.todos.map((todo) =>
          <li key={todo.id}>
            <span className={todo.completed ? "Done" : "Pending"}>{todo.text}</span>
            <button className="btn btn-sm btn-danger" onClick={}>X</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
