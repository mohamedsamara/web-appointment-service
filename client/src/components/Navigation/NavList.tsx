import { PropsWithChildren } from "react";
import List from "@mui/material/List";

const NavList = ({ children }: PropsWithChildren) => {
  return <List>{children}</List>;
};

export default NavList;
