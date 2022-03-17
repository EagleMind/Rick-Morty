import "bootstrap/dist/css/bootstrap.min.css";
import {
  DropdownButton,
  Dropdown,
  Form,
  Col,
  Row,
  Container,
  Card,
  Table,
  Modal,
  Button,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";

function EpisodeDetails(episodes) {
  const [modalDetails, setModalDetails] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = (el) => {
    setShow(true);
    const modalDetails = episodes.data.filter((ep) => ep.id === el);
    setModalDetails(modalDetails);
  };

  return (
    <>
      <div>
        {episodes.data.length >= 1 ? (
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Episodes Name</th>
              </tr>
            </thead>
            <tbody>
              {episodes.data.map((el, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{el.name}</td>
                    <td>
                      <Button
                        className="primary"
                        onClick={() => handleShow(el.id)}
                      >
                        Open Details
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          ""
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Episode Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            {Object.entries(modalDetails).map((el, index) => {
              return (
                <>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <th>{el[1].name}</th>
                    </tr>
                    <tr>
                      <th>Air Date</th>

                      <th>{el[1].air_date}</th>
                    </tr>
                    <tr>
                      <th>Episode</th>

                      <th>{el[1].episode}</th>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EpisodeDetails;
