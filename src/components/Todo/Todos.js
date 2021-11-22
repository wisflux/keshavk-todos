import { useEffect, useState } from 'react';
import AddTodo from './AddTodo';
import Todo from './Todo';

const url = 'http://localhost:3009/api/TodoList';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleError = () => {
    setSuccessMessage('');
    setErrorMessage('Done!!!');
    setTimeout(() => setErrorMessage(''), 3000);
  };

  const handleSubmit = async (newTodo) => {
    setErrorMessage('');
    setSuccessMessage('Added Todo Successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const todo = await response.json();
    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos);
  };

  const handleDelete = async (id) => {
    setSuccessMessage('');
    setErrorMessage('Delete Todo');
    setTimeout(() => setSuccessMessage(''), 3000);

    const response = await fetch(url + '/' + id, { method: 'DELETE' });
    await response.json();

    const updatedTodos = todos.filter((todo) => todo._id !== id);
    setTodos(updatedTodos);
  };

  const handleUpdate = async (id) => {
    setErrorMessage('');
    setSuccessMessage('Added Todo Successfully');
    const response = await fetch(url + '/' + id, {
      method: 'PUT',
      body: JSON.stringify({ completed: true }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const updatedTodo = await response.json();

    const updatedTodos = todos.map((todo) =>
      todo._id === id ? updatedTodo : todo
    );
    setTodos(updatedTodos);
  };

  const getAllTodos = async () => {
    const response = await fetch(url);
    const allTodos = await response.json();
    setTodos(allTodos);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <>
      <div
        style={{ display: errorMessage.length ? 'block' : 'none' }}
        className='message'
      >
        <div className='red'>{errorMessage}</div>
        <div className='green'>{successMessage}</div>
      </div>
      <AddTodo handleSubmit={handleSubmit} handleError={handleError} />
      <div className='todos'>
        <div className='todo__list'>
          <h4 className='todos__header'>Active Todos</h4>
          {todos.map(
            (todo, index) =>
              !todo.completed && (
                <Todo
                  key={index}
                  name={todo.name}
                  id={todo._id}
                  handleDelete={handleDelete}
                  completed={todo.completed}
                  handleUpdate={handleUpdate}
                />
              )
          )}
        </div>
        <div className='todo__list'>
          <h4 className='todos__header'>Completed Todos</h4>
          {todos.map(
            (todo, index) =>
              todo.completed && (
                <Todo
                  key={index}
                  name={todo.name}
                  id={todo._id}
                  handleDelete={handleDelete}
                  completed={todo.completed}
                  handleUpdate={handleUpdate}
                />
              )
          )}
        </div>
      </div>
    </>
  );
};

export default Todos;
