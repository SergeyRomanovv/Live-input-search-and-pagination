import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Table, Pagination, Dropdown, DropdownButton } from "react-bootstrap";

export default function ModalWindow({ show, handleClose, handleShow, persons }) {
  console.log(persons);
  const [inputValue, setInputValue] = useState('');
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(10)
  const [dropdown, setDropdown] = useState(10);
  console.log('startDropdownCounter', start);
  console.log('endDropdownCounter', end);

  useEffect(() => {
    return () => {
      setInputValue(null)
    }
  }, [show])

  function clickHandler(curElement) {
    const selectedPerson = `${curElement.name} ${curElement.surname} ${curElement.secondName}`
    setInputValue(selectedPerson)
  }
  //! --------- Pagination --------------
  function paginationHandler(data) {
    const allPages = Math.ceil(data.length / dropdown);
    let items = [];
    for (let number = 1; number <= allPages; number++) {
      items.push(
        <Pagination.Item key={number} onClick={(e) => paginationChangeHandler(Number(e.target.innerHTML))} >
          {number}
        </Pagination.Item>,
      );
    }
    return items
  }
  //? --------- Pagination end --------------
  
  
  function dropdownChangeHandler(number) {
    setDropdown(number);
    setEnd(number);
    console.log(number);
  }

  function paginationChangeHandler(number) {
    console.log(number);
    setStart((number - 1) * dropdown);
    setEnd(number * dropdown);
  }


  return (
    <>
      <Modal show={show} onHide={handleClose} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title>Расширенный поиск</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Поиск</Form.Label>
              <Form.Control
                type="text"
                placeholder="ФИО"
                name="fio"
                onChange={(event) => setInputValue(event.target.value)}
                value={inputValue || ''}
              />
              <div id="fio">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>ФИО</th>
                      <th>Пол</th>
                      <th>Дата рождения</th>
                      <th>Подразделение</th>
                      <th>Должность</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!inputValue ?
                      persons?.filter((element, index) => {
                        return index >= start && index < end
                      }).map((element) => {
                        return (
                          <tr key={element.id} onClick={() => clickHandler(element)}>
                            <td>{element.id}</td>
                            <td>{element.name} {element.surname} {element.secondName}</td>
                            <td>{element.gender}</td>
                            <td>{element.dob}</td>
                            <td>{element.Department}</td>
                            <td>{element.position}</td>
                          </tr>
                        );
                      })
                      :
                      persons?.filter((person) => {
                        return `${person.name} ${person.surname} ${person.secondName}`.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
                      }).slice(0, end)
                        .map((element) => {
                          return (
                            <tr key={element.id} onClick={() => clickHandler(element)}>
                              <td>{element.id}</td>
                              <td>{element.name} {element.surname} {element.secondName}</td>
                              <td>{element.gender}</td>
                              <td>{element.dob}</td>
                              <td>{element.Department}</td>
                              <td>{element.position}</td>
                            </tr>
                          )
                        })
                    }
                  </tbody>
                </Table>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">

          <div className="mb-2">
            <DropdownButton
              align='start'
              variant="primary"
              title={dropdown}
            >
              <Dropdown.Item onClick={(e) => dropdownChangeHandler(Number(e.target.innerHTML))} eventKey="1">10</Dropdown.Item>
              <Dropdown.Item onClick={(e) => dropdownChangeHandler(Number(e.target.innerHTML))} eventKey="2">20</Dropdown.Item>
              <Dropdown.Item onClick={(e) => dropdownChangeHandler(Number(e.target.innerHTML))} eventKey="3">30</Dropdown.Item>
              <Dropdown.Item onClick={(e) => dropdownChangeHandler(Number(e.target.innerHTML))} eventKey="4">50</Dropdown.Item>
            </DropdownButton>
          </div>

          <div>
            <Pagination size="sm">{paginationHandler(persons || [])}</Pagination>
          </div>
          <div className="d-flex justify-content-between">
            <Button className="m-3" variant="secondary" onClick={() => handleClose()}>
              Close
            </Button>
            <Button className="m-3" variant="primary" onClick={() => handleClose(inputValue)}>
              Save Changes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
