import {useSuspenseQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {todoApi} from '@/api/todoApi';

export const useTodos = () => {
  return useSuspenseQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      return await todoApi.fetchTodos()
    }
  });
};

export const useTodo = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['todos', id],
    queryFn: async () => {
      return await todoApi.fetchTodoById(id)
    }
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (title: string) => {
      return await todoApi.addTodo(title)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
    },
  });
};

export const useToggleTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await todoApi.toggleTodo(id)
    },
    onSuccess: (updated) => {
      queryClient.invalidateQueries({queryKey: ['todos']});
      queryClient.setQueryData(['todos', updated.id], updated);
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await todoApi.deleteTodo(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
    },
  });
};
