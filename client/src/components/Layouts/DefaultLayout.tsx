import { useState, PropsWithChildren } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import DrawerHeader from "components/Navbar/DrawerHeader";
import Navbar, { DRAWER_WIDTH } from "../Navbar";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${DRAWER_WIDTH}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

const DefaultLayout = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Navbar
        open={open}
        onOpen={handleDrawerOpen}
        onClose={handleDrawerClose}
      />
      <Main open={open}>
        <DrawerHeader />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
            height: {
              xs: `calc(env(safe-area-inset-top) + 100vh - 56px)`,
              sm: `calc(env(safe-area-inset-top) + 100vh - 64px)`,
            },
          }}
        >
          {children}
        </Box>
      </Main>
    </Box>
  );
};

export default DefaultLayout;
