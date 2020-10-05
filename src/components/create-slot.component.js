import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import TimePicker from "react-bootstrap-time-picker";
import Axios from "axios";

const CreateSlot = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [time, setTime] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("-");
  const [timeSlot, setTimeSlot] = useState();

  useEffect(() => {
    setTimeSlot(new Date(props.date.setHours(0, 0, 0, 0)));
  }, [props.date]);

  const handleClick = () => {
    setOpenModal(!openModal);
  };

  const handleTimeChange = (value) => {
    setTime(value);
    const date = new Date(props.date.setHours(0, 0, 0, 0));
    date.setSeconds(value);
    setTimeSlot(date);
  };

  const handleChange = (value) => (e) => {
    if (value === "name") {
      setName(e.target.value);
    } else if (value === "description") {
      setDescription(e.target.value);
    }
  };

  const Clear = () => {
    setName("");
    setDescription("");
    setTime(0);
  };

  const handleSubmit = () => {
    Axios.post(
      "http://localhost:5000/slots/add",
      JSON.stringify({
        name: name,
        description: description,
        timeslot: timeSlot,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res;
      })
      .then(() => {
        getSlots();
        Clear();
        handleClick();
      });
  };

  const getSlots = async () => {
    Axios.get("http://localhost:5000/slots")
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        props.handleChange(props.date, data);
      });
  };

  return (
    <div>
      <Button variant="primary" onClick={handleClick}>
        + Add Slot
      </Button>
      <Modal show={openModal} onHide={handleClick}>
        <Modal.Header closeButton>
          <Modal.Title>Gym Slot {props.date.toLocaleDateString()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                onChange={handleChange("name")}
              />
            </Form.Group>
            <Form.Group controlId="formTimeSlot">
              <Form.Label>Time Slot</Form.Label>
              <TimePicker
                start="00:00"
                end="23:30"
                step={30}
                onChange={handleTimeChange}
                value={time}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description (Optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                onChange={handleChange("description")}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClick}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Add Timeslot
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateSlot;
