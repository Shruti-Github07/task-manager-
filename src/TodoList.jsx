import List from "@mui/material/List";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { Box, Typography } from "@mui/material";

import { useState, useEffect } from "react";

const getInitialData = () => {
  const data = JSON.parse(localStorage.getItem("todos"));
  if (!data) return [];
  return data;
};

export default function TodoList() {
  const [todos, setTodos] = useState(getInitialData);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const removeTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((t) => t.id !== id);
    });
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      });
    });
  };

  // const addTodo = (text) => {
  //   setTodos((prevTodos) => {
  //     return [
  //       ...prevTodos,
  //       { text: text, id: crypto.randomUUID(), completed: false },
  //     ];
  //   });
  // };
  const addTodo = (text) => {
    if (text) { // Check if the text is not empty or null
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          { text: text, id: crypto.randomUUID(), completed: false },
        ];
      });
    } else {
      window.alert("Please enter a todo item."); // Display an alert message
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        m: 3,
      }}
    >
      {/* <Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>
        Todos
      </Typography> */}
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            remove={removeTodo}
            toggle={() => toggleTodo(todo.id)}
            sx={{
              backgroundColor: todo.completed ? "green" : "inherit",
            }}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </List>
    </Box>
  );
}
