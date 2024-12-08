import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import palette from "./palette";
import typography from "./typography";

const theme = createTheme({
  cssVariables: true,
  palette: palette,
  typography,
});

export default responsiveFontSizes(theme);
