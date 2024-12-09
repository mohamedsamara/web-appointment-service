import { PropsWithChildren } from "react";
import Container, { ContainerProps } from "@mui/material/Container";
import Box, { BoxProps } from "@mui/material/Box";

type ContentLayoutProps = PropsWithChildren & ContainerProps;

export const ContentLayout = ({
  children,
  sx,
  ...rest
}: ContentLayoutProps) => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        paddingTop: 3,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Container>
  );
};

type FixedHeightLayoutProps = PropsWithChildren & BoxProps;

export const FixedHeightLayout = ({
  children,
  sx,
  ...rest
}: FixedHeightLayoutProps) => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
