import React, { useState, useRef, useEffect }  from 'react'
import TodoList from './TodoList'
import { v4 } from 'uuid'

const LocalStorageKey = 'todoApp.todos'

function App() {

  const [todos, setTodos] = useState([])
  // {id: 1, name: 'Todo 1', completed: true}, {id: 2, name: 'Todo 2', completed: false}
  const todoName = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LocalStorageKey))
    if( storedTodos ) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LocalStorageKey, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoName.current.value
    if(name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: v4(), name: name, completed: false }]
    })
    todoName.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  return (
    /*
      <>

      </> Means a fragment. Normally, you can not render a React component and a HTML element, but you can do it with fragments.
    */
    <>
      <div id='card'>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <hr />
        <input type='text' ref={todoName} />
        <div id='buttons'> <button onClick={handleAddTodo} > Add Todo </button> <button onClick={handleClearTodos}> Clear Completed Todos </button> </div>
        <label> {todos.filter(todo => !todo.completed).length} left to do. </label>
      </div>
    </>
  );
}

export default App;
