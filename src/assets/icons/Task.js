import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Task = ({ style, color = "#181C2E", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    style={style}
    {...props}
  >
    <Path d="M0 0h24v24H0z" stroke="none" />
    <Path
      d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 10a3 3 0 1 0 6 0 3 3 0 1 0-6 0"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Task;
