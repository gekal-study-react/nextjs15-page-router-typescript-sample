import React from "react";
import { CircularProgress } from "@mui/material";
import { AppBackdrop } from "./AppBackdrop";

export const Loading: React.FC = () => (
  <AppBackdrop open={true}>
    <CircularProgress color="inherit" />
  </AppBackdrop>
);
