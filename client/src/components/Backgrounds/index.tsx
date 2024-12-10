import { PropsWithChildren } from "react";
import Paper, { PaperProps } from "@mui/material/Paper";

export const PaperBackground = ({
  children,
  sx,
  ...rest
}: PropsWithChildren & PaperProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Paper>
  );
};
