import React from "react";
import "./styles.css";

const InputField = () => {
  return (
    <form className="input">
      <input className="input_box" placeholder="Add Task" type="input" />
      <button className="input_submit" type="submit">
        Submit
      </button>
    </form>
  );
};

export default InputField;
