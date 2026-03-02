import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  Paper,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Layout } from '../components/Layout';
import { useTodos, useAddTodo, useToggleTodo, useDeleteTodo } from '../hooks/useTodos';
import Link from 'next/link';

const TodoList: React.FC = () => {
  const { data: todos } = useTodos();
  const addTodo = useAddTodo();
  const toggleTodo = useToggleTodo();
  const deleteTodo = useDeleteTodo();
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim()) {
      addTodo.mutate(newTodoTitle);
      setNewTodoTitle('');
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        TODO リスト
      </Typography>

      <Paper component="form" onSubmit={handleAddTodo} sx={{ p: 2, mb: 4, display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="何をする必要がありますか？"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          disabled={addTodo.isPending}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={addTodo.isPending || !newTodoTitle.trim()}
        >
          追加
        </Button>
      </Paper>

      {todos.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center">
          TODO がまだありません。上から追加してください！
        </Typography>
      ) : (
        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              disablePadding
              sx={{
                mb: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              <ListItemIcon sx={{ pl: 2 }}>
                <Checkbox
                  edge="start"
                  checked={todo.completed}
                  onChange={() => toggleTodo.mutate(todo.id)}
                  disabled={toggleTodo.isPending}
                />
              </ListItemIcon>
              <ListItemText
                primary={todo.title}
                sx={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? 'text.secondary' : 'text.primary',
                }}
              />
              <ListItemSecondaryAction>
                <Link href={`/todo/${todo.id}`} passHref legacyBehavior>
                  <IconButton edge="end" aria-label="details">
                    <ArrowForwardIosIcon fontSize="small" />
                  </IconButton>
                </Link>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteTodo.mutate(todo.id)}
                  disabled={deleteTodo.isPending}
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default function Home() {
  return (
    <Layout>
      <TodoList />
    </Layout>
  );
}
