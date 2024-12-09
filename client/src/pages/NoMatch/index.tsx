import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";

const NoMatch = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h4">Page not found</Typography>
      <Typography variant="body1">
        Sorry, we could not find the page you are looking for.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NoMatch;
