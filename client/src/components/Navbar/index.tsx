import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import DrawerHeader from "./DrawerHeader";
import { NavList, NavListItem } from "../Navigation";

const NAV_ITEMS = [
  {
    route: "/",
    name: "Home",
    icon: HomeIcon,
  },
  {
    route: "/schedule",
    name: "Schedule",
    icon: CalendarMonthIcon,
  },
];

export const DRAWER_WIDTH = 70;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: `${DRAWER_WIDTH}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Navbar = ({
  open,
  onOpen,
  onClose,
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  return (
    <>
      <AppBar position="fixed" color="default" elevation={0} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            LOGO
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            boxShadow: "none",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ justifyContent: "center" }}>
          <IconButton onClick={onClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <NavList>
          {NAV_ITEMS.map((item, idx) => (
            <NavListItem key={idx} item={item} tooltip />
          ))}
        </NavList>
      </Drawer>
    </>
  );
};

export default Navbar;
