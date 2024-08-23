"use client";
import { Roboto, Work_Sans } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const workSans = Work_Sans({ subsets: ["latin"] });

const theme = createTheme({
  palette: {
    primary: {
      main: "#0A1047",
      light: "#141E7A",
    },
    secondary: {
      main: "#6E314A",
      light: "#FE645E",
    },
    error: {
      main: "#FE645E",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: workSans.style.fontFamily,
    subtitle1: {
      fontSize: "15px",
      color: "#5C5C5C",
    },
    subtitle2: {
      fontSize: "12px",
      color: "#5C5C5C",
    },
    h3: {
      fontSize: "25px",
      color: "#000",
      lineHeight: "34px",
    },
    h1: {
      fontSize: "45px",
      fontWeight: "normal",
    },
    h2: {
      fontSize: "30px",
      fontWeight: "normal",
    },
  },
});

export default theme;
