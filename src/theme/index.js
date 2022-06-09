import { createTheme } from "@mui/material";
import colors from "./colors";
import ComponentsOverride from "./components";

const theme = createTheme({
  palette: colors,
});

theme.components = ComponentsOverride(theme);

export default theme;
