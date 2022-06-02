import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import ModalWindow from "../ModalWindow/ModalWindow";

export default function SearchForm() {
  const [inputValue, setInputValue] = useState('');
  const [peoplesList, setPeoplesList] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = (e) => {
    if (e) {
      console.log(e);
      setInputValue(e)
    }
    setShow(false)
  };
  const handleShow = () => setShow(true);

  // const getPeopleHandler = async () => {
  //   let people = await axios.get('http://localhost:3001/people');
  //   peoplesList(people.data);
  function inputChangeHandler (e) {
    setInputValue(e.target.value)
  }
  // }
  useEffect(() => {
    axios.get('http://localhost:3001/people').then((peoples) => setPeoplesList(peoples.data));
  }, [])
  
  console.log(peoplesList);
  return (
    <>
      <div className="header">
        <p>Сотрудники</p>
      </div>
      <div className="categoriesSearch">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="ФИО" 
            list="fio" 
            name="fio"
            onChange={(e) => inputChangeHandler(e)}
            value={inputValue}
            />
            <datalist id="fio">
              {peoplesList?.filter((person) => {
                return `${person.name} ${person.surname} ${person.secondName}`.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
              }).slice(0, 5)
              .map((element) => {
                return <option key={element.id}>{`${element.name} ${element.surname} ${element.secondName}`}</option>
              })}
            </datalist>
            <Button variant="primary" onClick={handleShow}>
              Launch demo modal
            </Button>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" placeholder="Дата" />
            <Form.Control type="date" placeholder="Дата" />
          </Form.Group>
        </Form>
      </div>
      <ModalWindow collbackData = {inputChangeHandler} persons = {peoplesList} show = {show} handleClose = {handleClose} handleShow = {handleShow} />
    </>
  );
}
