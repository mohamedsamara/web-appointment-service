import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import palette, { border } from "./palette";
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: border.primary,
        },
      },
      variants: [
        {
          props: { color: "default" },
          style: {
            background: palette.background?.paper,
          },
        },
      ],
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderColor: border.primary,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: border.primary,
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
