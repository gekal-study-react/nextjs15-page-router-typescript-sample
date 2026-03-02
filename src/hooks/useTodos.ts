import {useSuspenseQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {todoApi} from '@/api/todoApi';

export const useTodos = () => {
  return useSuspenseQuery({
    queryKey: ['todos'],
    queryFn: () => todoApi.fetchTodos(),
  });
};

export const useTodo = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['todos', id],
    queryFn: () => todoApi.fetchTodoById(id),
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (title: string) => todoApi.addTodo(title),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
    },
  });
};

export const useToggleTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => todoApi.toggleTodo(id),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({queryKey: ['todos']});
      queryClient.setQueryData(['todos', updated.id], updated);
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => todoApi.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
    },
  });
};
