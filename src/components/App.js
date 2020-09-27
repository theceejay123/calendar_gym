import React, { useState } from "react";
import Calendar from "react-calendar";
import "./App.css";

const App = () => {
  const [date, setDate] = useState(new Date());

  const handleChange = (date) => {
    setDate(date);
  };

  return (
    <div>
      <Calendar onChange={handleChange} value={date} />
    </div>
  );
};

export default App;
