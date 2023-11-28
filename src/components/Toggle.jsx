import { useState } from "react";

export const Toggle = ({ label, toggled, onClick }) => {
  const [isToggled, setIsToggle] = useState(toggled);

  const callback = () => {
    onClick(!isToggled);

    setIsToggle(!isToggled);
  };

  return (
    <label>
      <input type="checkbox" defaultChecked={isToggled} onClick={callback} />

      <span />

      <strong>{label}</strong>
    </label>
  );
};
