import { TypographyOptions } from "@mui/material/styles/createTypography";

export const serifFamily = "sans-serif";
export const fontFamily = "Roboto";

export const weight = {
  extraBold: 900,
  bold: 700,
  medium: 500,
  regular: 400,
};

const typography: TypographyOptions = {
  fontFamily: [fontFamily, serifFamily].join(","),
  h1: {
    fontFamily,
    fontStyle: "normal",
    fontSize: 56,
    lineHeight: 1.2,
    fontWeight: weight.extraBold,
  },
  h2: {
    fontFamily,
    fontStyle: "normal",
    fontWeight: weight.extraBold,
    fontSize: 40,
    lineHeight: 1.3,
  },
  h3: {
    fontFamily,
    fontStyle: "normal",
    fontWeight: weight.bold,
    fontSize: 32,
    lineHeight: 1.2,
  },
  h4: {
    fontFamily,
    fontStyle: "normal",
    fontWeight: weight.bold,
    fontSize: 28,
    lineHeight: 1.25,
    letterSpacing: "0.0025em",
  },
  h5: {
    fontFamily,
    fontStyle: "normal",
    fontWeight: weight.medium,
    fontSize: 20,
    lineHeight: 1.3,
  },
  h6: {
    fontFamily,
    fontStyle: "normal",
    fontWeight: weight.medium,
    fontSize: 18,
    lineHeight: 1.25,
    letterSpacing: "0.0015em",
  },
  subtitle1: {
    fontFamily,
    fontStyle: "normal",
    fontWeight: weight.medium,
    fontSize: 18,
    lineHeight: 1.4,
    letterSpacing: "0.0015em",
  },
  subtitle2: {
    fontFamily,
    fontStyle: "normal",
    fontWeight: weight.medium,
    fontSize: 16,
    lineHeight: 1.25,
    letterSpacing: "0.001em",
  },
  body1: {
    fontFamily,
    fontStyle: "normal",
    fontWeight: weight.regular,
    fontSize: 18,
    lineHeight: 1.5,
    letterSpacing: "0.005em",
  },
  body2: {
    fontFamily,
    fontStyle: "normal",
    fontWeight: weight.regular,
    fontSize: 16,
    lineHeight: 1.4,
    letterSpacing: "0.0025em",
  },
  button: {
    fontFamily,
    fontStyle: "normal",
    fontWeight: weight.bold,
  },
  caption: {
    fontFamily,
    fontStyle: "normal",
    fontWeight: weight.regular,
    fontSize: 14,
    lineHeight: 1.4,
    letterSpacing: "0.004em",
  },
  overline: {
    fontFamily,
    fontStyle: "normal",
    fontWeight: weight.medium,
    fontSize: 14,
    lineHeight: 1.25,
    letterSpacing: "0.015em",
    textTransform: "none",
  },
};

export default typography;
