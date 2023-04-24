import React from "react";
import { ReactComponent as SpinnerC } from "../../assets/spinner.svg";

// styles
import "./spinner.scss";

export default function Spinner() {
  return (
    <div className="spinner">
      <SpinnerC />
    </div>
  );
}
