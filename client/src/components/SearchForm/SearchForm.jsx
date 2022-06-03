import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import ModalWindow from "../ModalWindow/ModalWindow";

export default function SearchForm() {
  const [inputValue, setInputValue] = useState('');
  const [peoplesList, setPeoplesList] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = (e) => {
    if (e) {
      setInputValue(e)
    }
    setShow(false)
  };

  const handleShow = () => setShow(true);

  function inputChangeHandler(e) {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    axios.get('http://localhost:3001/people').then((peoples) => setPeoplesList(peoples.data));
  }, [])

  return (
    <>
      <div className="header">
        <p>Сотрудники</p>
      </div>
      <div className="categoriesSearch">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Руководитель</Form.Label>
            <InputGroup>
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
              <Button variant="outline-success" onClick={handleShow}>
                <img src="./test.svg" alt="" />
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
      <ModalWindow persons={peoplesList} show={show} handleClose={handleClose} handleShow={handleShow} />
    </>
  );
}
