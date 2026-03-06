import React, { useState } from "react";
import { Backdrop, BackdropProps } from "@mui/material";

interface AppBackdropProps extends Omit<BackdropProps, "children"> {
  children?: React.ReactNode;
}

export const AppBackdrop: React.FC<AppBackdropProps> = ({ children, sx, ...props }) => {
  const [isEntering, setIsEntering] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        flexDirection: "column",
        gap: 2,
        ...sx,
      }}
      {...props}
      open={isEntering || (!isExiting && props.open)}
      onEnter={(node, isAppearing) => {
        setIsEntering(true);
        if (props.onEnter) {
          props.onEnter(node, isAppearing);
        }
      }}
      onEntered={(node, isAppearing) => {
        setIsEntering(false);
        if (props.onEntered) {
          props.onEntered(node, isAppearing);
        }
      }}
      onExit={(node) => {
        setIsExiting(true);
        if (props.onExit) {
          props.onExit(node);
        }
      }}
      onExited={(node) => {
        setIsExiting(false);
        if (props.onExited) {
          props.onExited(node);
        }
      }}
    >
      {children}
    </Backdrop>
  );
};
