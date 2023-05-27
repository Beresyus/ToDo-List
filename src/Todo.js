import React from 'react'

export default function Todo( { todo, toggleTodo } ) {

  function handleTodoClick() {
    toggleTodo(todo.id)
  }

  return (
    <div style={{display: 'flex', lineHeight: 12 + 'px'}} id={todo.id}>
        <input style={{marginRight: 0.5 + 'vh'}} type='checkbox' onChange={handleTodoClick} checked={ todo.completed }></input>
        <label style={{marginLeft: 0.5 + 'vh', color: 'black'}}> { todo.name } </label>
    </div>
  )
}
