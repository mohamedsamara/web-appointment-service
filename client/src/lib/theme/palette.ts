// import

import { PaletteOptions } from "@mui/material";
import { blue, green, red, yellow, grey } from "@mui/material/colors";

export const primary = blue[600];
export const secondary = grey[100];
export const disabled = grey[500];
export const white = "#fff";

export const hover = {
  primary: blue[50],
  secondary: grey[500],
  tertiary: grey[50],
};

const palette: PaletteOptions = {
  primary: {
    main: primary,
  },
  secondary: {
    main: secondary,
  },
  error: {
    main: red.A400,
  },
  info: {
    main: blue.A400,
  },
  warning: {
    main: yellow.A700,
  },
  success: {
    main: green.A700,
  },
  background: {
    default: secondary,
    paper: white,
  },
  text: {
    primary: grey[900],
    secondary: grey[700],
    disabled: disabled,
  },
  action: {
    active: grey[600],
    hover: grey[50],
    selected: blue[50],
    focus: grey[100],

    disabled: disabled,
    disabledBackground: grey[200],
  },
};

export default palette;
