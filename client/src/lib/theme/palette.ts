// import

import { PaletteOptions } from "@mui/material";
import { blue, green, red, yellow, grey } from "@mui/material/colors";

const primary = blue[700];
const secondary = grey[100];
const disabled = grey[500];
const white = "#fff";

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
};

export default palette;
