import { useState } from 'react';

const AddTodo = ({ handleSubmit, handleError }) => {
  const [newTodo, setNewTodo] = useState({ name: '' });

  const handleChange = (event) => {
    // const name = event.target.name;
    const value = event.target.value;
    setNewTodo((newTodo) => ({ ...newTodo, name: value }));
  };

  const handleFormFinish = (event) => {
    event.preventDefault();
    if (!newTodo.name.length) {
      handleError();
    } else {
      handleSubmit(newTodo);
      setNewTodo({ name: '', completed: false });
      // setSuccessMessage('Todo Succesfully added');
    }
  };

  return (
    <form className='todo__form' onSubmit={handleFormFinish}>
      <div className='todo__input__container'>
        <input
          className='todo__input'
          type='text'
          name='name'
          value={newTodo.name}
          onChange={handleChange}
          placeholder='Todo'
        />
      </div>
      <button className='btn' type='submit'>
        Submit
      </button>
    </form>
  );
};

export default AddTodo;
