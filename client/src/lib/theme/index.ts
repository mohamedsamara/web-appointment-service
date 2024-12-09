import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import palette from "./palette";
import typography from "./typography";

const theme = createTheme({
  cssVariables: true,
  palette: palette,
  typography,
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: palette.action?.selected,
            ":hover": {
              backgroundColor: palette.action?.selected,
            },
          },
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
