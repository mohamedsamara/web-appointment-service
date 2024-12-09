import { PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import Navbar from "../Navbar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
