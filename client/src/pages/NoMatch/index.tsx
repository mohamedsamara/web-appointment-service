import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";

import { FixedHeightLayout } from "components/Layouts";

const NoMatch = () => {
  const navigate = useNavigate();

  return (
    <FixedHeightLayout sx={{ gap: 2, paddingX: 4 }}>
      <Typography variant="h4">Page not found</Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        Sorry, we could not find the page you are looking for.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </FixedHeightLayout>
  );
};

export default NoMatch;
