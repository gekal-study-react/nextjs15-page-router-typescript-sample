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
          一覧に戻る
        </Button>
      </Link>
      
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          タスク詳細
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'bold' }}>
            タイトル
          </Typography>
          <Typography variant="body1" sx={{ mt: 0.5 }}>
            {todo.title}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'bold' }}>
            状態
          </Typography>
          <Typography variant="body1" sx={{ mt: 0.5 }}>
            {todo.completed ? '完了' : '未完了'}
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'bold' }}>
            作成日時
          </Typography>
          <Typography variant="body1" sx={{ mt: 0.5 }}>
            {new Date(todo.createdAt).toLocaleString('ja-JP')}
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
