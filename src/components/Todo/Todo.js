const Todo = (props) => (
  <div className='todo__card'>
    <div className='todo__card__heading'>{props.name}</div>
    <div>
      <div className='todo__card__button__container'>
        <button className='btn' onClick={() => props.handleDelete(props.id)}>
          Delete
        </button>
      </div>
      {!props.completed && (
        <div className='todo__card__button__container'>
          <button className='btn' onClick={() => props.handleUpdate(props.id)}>
            Add To Completed
          </button>
        </div>
      )}
    </div>
  </div>
);

export default Todo;
