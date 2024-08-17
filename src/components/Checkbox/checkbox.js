import React, { useState } from "react";
import { connect } from "react-redux";

const CheckBox = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        required
      />
      <label>Remember me</label>
    </div>
  );
};

export default CheckBox;
