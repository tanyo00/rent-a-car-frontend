import React, { useState } from 'react'
import { spinner } from './Messages'
import { Modal, Button } from 'react-bootstrap'

export default function BrowseCust () {
  const [cust, setCust] = React.useState([])
  const [ready, setReady] = React.useState(false)
  React.useEffect(() => {
    fetch('http://localhost:5000/customers')
      .then(res => res.json())
      .then(data => {
        setCust(data)
        setReady(true)
      })
  }, [])

  const deleteCust = e => {
    const newData = cust.filter(
      customer => JSON.stringify(customer) !== e.target.name
    )
    setCust(newData)
    console.log(newData)
    fetch('http://localhost:5000/customers/' + e.target.name, {
      method: 'DELETE'
    })
  }

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)

  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleName = e => {
    setNewName(e.target.value)
  }
  const handleEmail = e => {
    setNewEmail(e.target.value)
  }
  const handlePhone = e => {
    setNewPhone(e.target.value)
  }

  const [edited, setEdited] = useState([])

  const handleShow = e => {
    setShow(true)
    let cus = cust.filter(
      customer => JSON.stringify(customer) === e.target.name
    )
    setEdited(cus)
  }
  const handleEdit = e => {
    if (newName.length > 0) {
      edited[0].fullName = newName
      setNewName('')
    }
    if (newEmail.length > 0) {
      edited[0].email = newEmail
      setNewEmail('')
    }
    if (newPhone.length > 0) {
      edited[0].phone = newPhone
      setNewPhone('')
    }
    console.log(edited)
    fetch('http://localhost:5000/customers', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(edited)
    })
  }

  return (
    <>
      {ready ? (
        <div className='container-customers'>
          {cust.map(customer => {
            return (
              <div key={customer._id} className='customer'>
                <h1>{customer.fullName}</h1>
                <h5>Email: {customer.email}</h5>
                <p>Phone: {customer.phone}</p>
                <div className='rentals'>
                  <h3>Rentals:</h3>
                  {customer.rentals.map((rent, index) => {
                    return (
                      <div className='rental' key={index}>
                        Type: <h3>{rent.vehicleType}</h3>
                        Brand: <h3>{rent.brand}</h3>
                        Price: <h4>{rent.price} $</h4>
                        Days rented: <h3>{rent.days}</h3>
                      </div>
                    )
                  })}
                </div>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit customer</Modal.Title>
                  </Modal.Header>
                  <div className='modal-inputs'>
                    <input
                      placeholder='New name...'
                      className='inpt newName'
                      onChange={handleName}
                    />
                    <input
                      placeholder='New email...'
                      className='inpt newEmail'
                      onChange={handleEmail}
                    />
                    <input
                      placeholder='New phone number...'
                      className='inpt newPhone'
                      onChange={handlePhone}
                    />
                  </div>
                  <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      variant='primary'
                      onClick={() => {
                        handleClose()
                        handleEdit()
                      }}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Button
                  variant='success'
                  onClick={handleShow}
                  name={JSON.stringify(customer)}
                >
                  Edit
                </Button>
                <Button
                  variant='danger'
                  onClick={deleteCust}
                  name={JSON.stringify(customer)}
                >
                  Delete
                </Button>
              </div>
            )
          })}
        </div>
      ) : (
        <div className='spinner'>{spinner()}</div>
      )}
    </>
  )
}
