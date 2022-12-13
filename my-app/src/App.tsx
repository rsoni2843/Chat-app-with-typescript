import React from "react";
import "./App.css";
import InputField from "./Component/InputField";

// let name: string;
// name = 10 ;
// console.log(obj);

// type Person = {
//   name: string;
//   age: number | string; // both number and string can be used
//   class?: string; // used for suppose its an optional field
// };
// interface AllDetails extends Person {
//   married?: boolean;
//   graduation?: boolean;
//   intermediate?: boolean;
// }
// let obj: AllDetails = {
//   name: "Nipendra",
//   age: 21,
//   class: "webDevelopement",
// };
// console.log(obj);

const App: React.FC = () => {
  return (
    <div className="App">
      <span>Taskify</span>
      <InputField />
    </div>
  );
};

export default App;
