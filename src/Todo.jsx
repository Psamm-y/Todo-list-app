import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './todo.css';
import { FcTodoList } from 'react-icons/fc';
import { ImBin } from 'react-icons/im';
import { FaGithub } from 'react-icons/fa';
const Todo = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTodos = localStorage.getItem('tasks');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [inputValue, setInputValue] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (inputValue.trim()) {
      setTasks([
        ...tasks,
        { id: uuidv4(), text: inputValue, completed: false },
      ]);
      setInputValue('');
    }
  };

  const toggleCompleted = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((todo) =>
        todo.id === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleRemove = (id) => {
    setTasks((prevTasks) => prevTasks.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem('tasks');
    if (storedTodos) {
      setTasks(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  return (
    <>
      {' '}
      <div className="todo-block">
        <div className="fixed">
          <h2>
            <FcTodoList />
            My Todo List App
          </h2>
          <form onSubmit={handleAddTodo}>
            <input
              type="text"
              onChange={handleInput}
              value={inputValue}
              placeholder="Enter a task..."
            />
            &nbsp;<button type="submit">Add todo</button>
          </form>
        </div>

        {tasks.map((todo) => (
          <ul key={todo.id}>
            <li className={todo.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                onChange={() => toggleCompleted(todo.id)}
              />
              &nbsp;
              {todo.text}
            </li>
            <span onClick={() => handleRemove(todo.id)}>
              <ImBin />
            </span>
          </ul>
        ))}
      </div>
      <footer>
        <div>
          &copy; 2025 Psammy dev
          <a href="https://github.com/psamm-y" target="_blank">
            &nbsp;
            <FaGithub />
          </a>
          . All rights reserved
        </div>
      </footer>
    </>
  );
};

export default Todo;
