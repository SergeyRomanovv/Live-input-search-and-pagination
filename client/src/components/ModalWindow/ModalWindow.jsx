import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

export default function ModalWindow({ show, handleClose, handleShow, persons, collbackData }) {
  let firstTenPerson = persons?.filter((person, index) => {
    return index < 20;
  })
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    return () => {
      setInputValue(null)
    }
  }, [show])
  function clickHandler(curElement) {
    const selectedPerson = `${curElement.name} ${curElement.surname} ${curElement.secondName}`
    setInputValue(selectedPerson)
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ФИО</Form.Label>
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
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
                    </tr>
                  </thead>
                  <tbody>
                  {!inputValue ?
                  firstTenPerson?.map((element) => {
                    return (<tr key={element.id} onClick={() => clickHandler(element)}>
                      <td>{element.name}</td>
                      <td>{element.surname}</td>
                      <td>{element.secondName}</td>
                    </tr>
                    );
                  })
                  :
                  persons?.filter((person) => {
                    return `${person.name} ${person.surname} ${person.secondName}`.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
                  }).slice(0, 5)
                    .map((element) => {
                      return (
                      <tr key={element.id} onClick={() => clickHandler(element)}>
                      <td>{element.name}</td>
                      <td>{element.surname}</td>
                      <td>{element.secondName}</td>
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
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={()=> handleClose(inputValue)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
