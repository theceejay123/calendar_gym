import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Axios from "axios";

const ListSlot = (props) => {
  const handleDelete = (e) => {
    console.log(e.target.value);
    Axios.delete(
      `http://backend.onpaper.ca:1337/slots/${e.target.value}`
    ).then((res) => console.log(res.data));
    props.handleChange(
      props.date,
      props.slots.filter((slot) => slot._id !== e.target.value)
    );
  };

  return (
    <div>
      <Table bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Slot</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.filteredSlots.map((slot, index) => (
            <tr key={index}>
              <td>{slot.name}</td>
              <td>{new Date(slot.timeslot).toLocaleTimeString()}</td>
              <td>{slot.description}</td>
              <td>
                <Button onClick={handleDelete} value={slot._id}>
                  delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListSlot;
