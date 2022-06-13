import { merge } from "lodash";
import Button from "./Button";

const ComponentsOverride = (theme) => {
  return merge(Button(theme));
};

export default ComponentsOverride;
