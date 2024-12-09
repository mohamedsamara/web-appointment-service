import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ScheduleLayout = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  if (matches) {
    return (
      <Box sx={{ overflowY: "hidden" }}>
        <Grid
          container
          spacing={2}
          sx={{
            height: {
              xs: `calc(env(safe-area-inset-top) + 100vh - 56px)`,
              sm: `calc(env(safe-area-inset-top) + 100vh - 64px)`,
            },
          }}
        >
          <Grid
            component="aside"
            size={{ xs: 12, md: 3 }}
            sx={{
              padding: 3,
            }}
          >
            Navlinks
          </Grid>
          <Grid
            component="section"
            size={{ xs: 12, md: 9 }}
            sx={{
              height: "100%",
              overflowY: "scroll",
            }}
          >
            <Outlet />
          </Grid>
        </Grid>
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
          showLabels
          //   value={value}
          //   onChange={(event, newValue) => {
          //     setValue(newValue);
          //   }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Box>
    </Box>
  );
};

export default ScheduleLayout;
