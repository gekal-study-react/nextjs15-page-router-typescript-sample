import React from 'react';
import {Backdrop, Box, keyframes} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loading: React.FC = () => (
  <Backdrop
    sx={{
      color: '#ff80ab', // 可愛らしいピンク色
      zIndex: (theme) => theme.zIndex.drawer + 1,
      flexDirection: 'column',
      gap: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // 少し明るめの背景
    }}
    open={true}
  >
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
      }}
    >
      {[0, 1, 2].map((i) => (
        <PetsIcon
          key={i}
          sx={{
            fontSize: 40,
            animation: `${bounce} 1s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </Box>
    <Box
      sx={{
        animation: `${rotate} 3s linear infinite`,
        mt: 2,
        fontWeight: 'bold',
        fontSize: '1.2rem',
        color: '#ff4081',
      }}
    >
      Loading...
    </Box>
  </Backdrop>
);