import React, { useEffect } from "react";
import "../css/style.css";
import { Container, Card, Col } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
function VideoCategoryHome() {
  useEffect(() => {
    console.log("get called.....");
  })
  return (
    <>
    <div >
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
    </div>
    </>

  );
}

export default VideoCategoryHome;
