import React from 'react'
import Header from '../components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import Myproject from '../components/Myproject'
import Profile from '../components/Profile'




function Dashboard() {
  return (
    <>
    <Header/>
    <div className="p-4 mt-5">
      <h3 className='mt-5'>Welcome <span className='text-warning'>User</span></h3>
      <Container>
        <Row className='mt-5'>
          <Col sm={12} md={8}><Myproject/></Col>
          <Col sm={12} md={4}><Profile/></Col>
        </Row>
      </Container>
    </div>
    </>
  )
}

export default Dashboard