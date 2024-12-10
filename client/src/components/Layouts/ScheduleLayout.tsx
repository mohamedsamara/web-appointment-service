import { useNavigate, Outlet } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import EventIcon from "@mui/icons-material/Event";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { NavList, NavListItem } from "../Navigation";
import { PaperBackground } from "../Backgrounds";
import { ReactNode, useState } from "react";

const ScheduleLayout = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const [value, setValue] = useState("recents");

  if (matches) {
    return (
      <Box
        sx={{
          display: "flex",
          overflowY: "hidden",
          height: {
            xs: `calc(env(safe-area-inset-top) + 100vh - 56px)`,
            sm: `calc(env(safe-area-inset-top) + 100vh - 64px)`,
          },
        }}
      >
        <Box
          component="aside"
          sx={{
            paddingLeft: 3,
            paddingTop: 3,
            flexBasis: 300,
          }}
        >
          <NavLinks />
        </Box>
        <Box
          component="section"
          sx={{
            flexGrow: 1,
            height: "100%",
            overflowY: "scroll",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        overflowY: "hidden",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
        }}
      >
        <Outlet />
      </Box>
      <Box sx={{ flexShrink: 0 }}>
        <BottomNavigation
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue);
            navigate(NAV_ITEMS[newValue].route);
          }}
        >
          {NAV_ITEMS.map((item) => {
            const NavIcon = item.icon;
            return (
              <BottomNavigationAction
                key={item.route}
                label={item.name}
                icon={(<NavIcon />) as ReactNode}
              />
            );
          })}
        </BottomNavigation>
      </Box>
    </Box>
  );
};

export default ScheduleLayout;

const NAV_ITEMS = [
  {
    route: "/schedule",
    name: "Schedule",
    end: true,
    icon: EventIcon,
  },
  {
    route: "/schedule/appointment-requests",
    name: "Appointment Requests",
    icon: ScheduleIcon,
  },
  {
    route: "/schedule/availability",
    name: "Availability",
    icon: EditCalendarIcon,
  },
];

const NavLinks = () => {
  return (
    <PaperBackground>
      <NavList>
        {NAV_ITEMS.map((item, idx) => (
          <NavListItem key={idx} item={item} />
        ))}
      </NavList>
    </PaperBackground>
  );
};
