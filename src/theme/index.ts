import { StatusBarStyle } from "expo-status-bar/src/StatusBar.types";
import { palette } from "./palette";

type ThemeColors = {
  background: string;
  foreground: string;
  text: string;
  textDim: string;
  textInverted: string;
  textInvertedDim: string;
  success: string;
  failure: string;
  danger: string;
  warning: string;
  info: string;

  // these colors are from navigation theme
  // setting these colors for some components in navigation
  card: string;
  primary: string;
  border: string;
  notification: string;
};

export type Theme = {
  dark: boolean;
  statusBarStyle: StatusBarStyle;
  colors: ThemeColors;
  palette: typeof palette;
};

export const lightTheme: Theme = {
  dark: false,
  statusBarStyle: "dark",
  colors: {
    background: "#fbf6fa",
    foreground: "#f0edf1",
    text: palette.black[90],
    textDim: palette.black[50],
    textInverted: palette.white[100],
    textInvertedDim: palette.white[60],
    success: palette.green[500],
    failure: palette.red[500],
    danger: palette.red[500],
    warning: palette.yellow[500],
    info: palette.blue[500],

    card: "#f4f1f4",
    primary: palette.orange[500],
    border: palette.black[30],
    notification: palette.blue[500],
  },
  palette,
};

export const darkTheme: Theme = {
  dark: true,
  statusBarStyle: "light",
  colors: {
    ...lightTheme.colors,
    background: "#fff",
    foreground: "#1f1f1f",
    text: palette.white[100],
    textDim: palette.white[50],
    success: palette.green[500],
    failure: palette.red[500],
    danger: palette.red[500],
    warning: palette.amber[500],
    info: palette.blue[500],

    card: "#282828",
    primary: palette.green[500],
    border: "#434343",
    notification: palette.blue[500],
  },
  palette,
};

export * from "./palette";

export * from "./spacing";

export const theme = lightTheme;
