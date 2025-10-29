//components/FanControlScreen.jsx

import FanSwitch from "./FanSwitch";
import FanSpeedSlider from "./FanSpeedSlider"

export default function FanControlScreen() {
return (
    <div style={{ padding: "40px" }}>
      <FanSwitch/>
      <FanSpeedSlider/>
    </div>
  );
}
      