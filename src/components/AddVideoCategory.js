import React, { useState } from 'react'
import { Container, Card, Col } from "react-bootstrap";
import "../css/style.css";

function AddVideoCategory() {
    const [categoryName, setCategoryName] = useState("")
    const [categoryDesc, setCategoryDesc] = useState("")

  return (
    <div className='App'>
        <Container >
        <Col  className="card-view add-video-cat-card">
          <Card >
            <Card.Body>
              <Card.Title>Sign In</Card.Title>
              <Card.Text>
                <p>
                <form>
                  <div className="mb-3">
                    <label>Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter category name"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Category Description</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter password"
                      value={categoryDesc}
                      onChange={(e) => setCategoryDesc(e.target.value)}
                    />
                  </div>
                </form>
                </p>
                <input className="btn btn-primary" type="submit" value="Submit"  />
              </Card.Text>
            </Card.Body>
          </Card>

        </Col>
      </Container>
    </div>
  )
}

export default AddVideoCategory
