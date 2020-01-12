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
  let input;
  // useQuery to read todos from the server
  // Use object destructuring to get data, loading, error which is used to update the UI
  const { data, loading, error } = useQuery(READ_TODOS);
  // send data back to the server using mutations
  const [createTodo] = useMutation(CREATE_TODO);
  const [deleteTodo] = useMutation(REMOVE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error reading todos</p>;
  if (!data) return <p>Not todos found</p>;

  return (
    <div className="App">
      <h3>Create New Todo</h3>
      {/* In the onSubmit, pass in the value of the input to createTodo and clear the input field */}
      <form onSubmit={e => {
        e.preventDefault();
        createTodo({ variables: { text: input.value } });
        input.value = '';
        window.location.reload();
      }}>
        {/* Bind the value of the input field to the input variable */}
        <input className="form-control" type="text" placeholder="Enter todo" ref={node => { input = node; }}></input>
        <button className="btn btn-primary" type="submit">Add</button>
      </form>
      <ul>
        {data.todos.map((todo) =>
          <li key={todo.id}>
            <span className={todo.completed ? "Done" : "Pending"}>{todo.text}</span>
            {/* Button passes the id of the todo to the server which in turn deletes it */}
            <button className="btn btn-sm btn-danger" onClick={() => {
              deleteTodo({ variables: { id: todo.id } });
              window.location.reload();
            }}>X</button>
            {/* Button passes the id of the todo to the server which in turn updates it */}
            <button className={`btn btn-sm ${todo.completed ? "btn-success" : "btn-info"}`} onClick={() => {
              updateTodo({ variables: { id: todo.id } });
              window.location.reload();
            }}>{todo.completed ? <span>Completed</span> : <span>Not completed</span>}</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
