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
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 16,
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
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        },
      },
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
