import React from 'react';
import { useRouter } from 'next/router';
import {
  Typography,
  Button,
  Paper,
  Box,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Layout } from '../../components/Layout';
import { useTodo } from '../../hooks/useTodos';
import Link from 'next/link';

const TodoDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: todo } = useTodo(id as string);

  return (
    <Box>
      <Link href="/" passHref legacyBehavior>
        <Button startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
          リストに戻る
        </Button>
      </Link>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          TODO 詳細
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="overline" color="text.secondary">
            タイトル
          </Typography>
          <Typography variant="body1">
            {todo.title}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="overline" color="text.secondary">
            ステータス
          </Typography>
          <Typography variant="body1">
            {todo.completed ? '完了' : '未完了'}
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="overline" color="text.secondary">
            作成日時
          </Typography>
          <Typography variant="body1">
            {new Date(todo.createdAt).toLocaleString()}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default function TodoDetailPage() {
  const router = useRouter();

  // Wait for router to be ready to get the ID
  if (!router.isReady) return null;

  return (
    <Layout>
      <TodoDetail />
    </Layout>
  );
}
