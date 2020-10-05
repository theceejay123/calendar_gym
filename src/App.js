import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";

// Component
import CreateSlot from "./components/create-slot.component";
import ListSlot from "./components/list-slot.component";

import "./App.css";

const App = () => {
  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [filteredSlots, setFilteredSlots] = useState([]);

  // Only triggers once for the first time
  useEffect(() => {
    console.log("triggered");
    const getData = async () => {
      fetch("https://backend.onpaper.ca/slots")
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          setSlots(data);
          localStorage.setItem("slots", JSON.stringify(data));
          setFilteredSlots(
            data.filter(
              (slot) =>
                new Date(slot.timeslot).toLocaleDateString() ===
                new Date().toLocaleDateString()
            )
          );
        });
    };

    getData();
  }, []);

  const handleChange = (date, data = slots) => {
    console.log(date.toLocaleDateString());
    setSlots(data);
    setFilteredSlots(
      data.filter(
        (slot) =>
          new Date(slot.timeslot).toLocaleDateString() ===
          date.toLocaleDateString()
      )
    );
    setDate(date);
  };

  return (
    <div>
      <Calendar onChange={handleChange} value={date} minDate={new Date()} />
      <div className="dateContent">
        <div className="dateContent__header">
          <h2 className="dateContent__title">Scheduler</h2>
          <CreateSlot date={date} handleChange={handleChange} />
        </div>
        <ListSlot
          date={date}
          slots={slots}
          handleChange={handleChange}
          filteredSlots={filteredSlots}
        />
      </div>
    </div>
  );
};

export default App;
