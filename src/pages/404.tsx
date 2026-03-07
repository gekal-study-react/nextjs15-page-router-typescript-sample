import React from "react";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function Custom404() {
  const router = useRouter();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="65vh"
    >
      <Paper elevation={3} sx={{ p: 6, textAlign: "center", maxWidth: 500, borderRadius: 3 }}>
        <Typography
          variant="h1"
          component="h1"
          color="primary"
          sx={{ fontWeight: "bold", mb: 1, fontSize: "6rem" }}
        >
          404
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: "bold" }}>
          ページが見つかりません
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5, lineHeight: 1.8 }}>
          お探しのページは存在しないか、移動した可能性があります。
          <br />
          一時的なエラーの場合は、リロードで解決することがあります。
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
          <Button
            variant="outlined"
            size="large"
            startIcon={<RefreshIcon />}
            onClick={() => router.push(router.asPath, undefined, { shallow: true })}
            sx={{ px: 4, py: 1.5, borderRadius: 10, borderWidth: 2, "&:hover": { borderWidth: 2 } }}
          >
            リロードする
          </Button>
          <Button
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => router.push("/")}
            sx={{ px: 4, py: 1.5, borderRadius: 10, boxShadow: 3 }}
          >
            ホームへ戻る
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
