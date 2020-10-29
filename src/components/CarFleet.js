import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { spinner } from './Messages'
import NoImage from '../assets/no-image.jpg'
import { Modal } from 'react-bootstrap'

export default function CarFleet () {
  const [cars, setCars] = React.useState([])

  const [customers, setCustomers] = React.useState([])
  const [isReady, setIsReady] = React.useState(false)

  React.useEffect(() => {
    fetch('http://localhost:5000/vehicles')
      .then(res => res.json())
      .then(data => {
        setCars(data)
        setIsReady(true)
      })

    fetch('http://localhost:5000/customers')
      .then(res => res.json())
      .then(data => {
        setCustomers(data)
      })
  }, [])

  const deleteVehicle = e => {
    let newArr = cars.filter(car => JSON.stringify(car) !== e.target.name)
    setCars(newArr)
    fetch('http://localhost:5000/vehicles/' + e.target.name, {
      method: 'DELETE'
    })
  }

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = e => {
    setShow(true)
    let searchedCar = cars.filter(car => JSON.stringify(car) === e.target.name)
    setNewData(searchedCar)
  }

  const [newType, setNewType] = useState('')
  const [newBrand, setNewBrand] = useState('')
  const [newModel, setNewModel] = useState('')
  const [year, setYear] = useState('')
  const [fuelType, setFuelType] = useState('')
  const [seats, setSeats] = useState('')
  const [price, setPrice] = useState('')
  const [vehiclesCount, setVehiclesCount] = useState('')

  const handleType = e => {
    setNewType(e.target.value)
  }

  const handleBrand = e => {
    setNewBrand(e.target.value)
  }

  const handleModel = e => {
    setNewModel(e.target.value)
  }

  const handleYear = e => {
    setYear(e.target.value)
  }

  const handleFuelType = e => {
    setFuelType(e.target.value)
  }

  const handleSeats = e => {
    setSeats(e.target.value)
  }

  const handlePrice = e => {
    setPrice(e.target.value)
  }

  const handleVehicleCount = e => {
    setVehiclesCount(e.target.value)
  }

  const [newData, setNewData] = useState([])

  const handleEdit = () => {
    if (newType.length > 0) {
      newData[0].vehicleType = newType
      setNewType('')
    }
    if (newBrand.length > 0) {
      newData[0].brand = newBrand
      setNewBrand('')
    }
    if (newModel.length > 0) {
      newData[0].model = newModel
      setNewModel('')
    }
    if (year.length > 0) {
      newData[0].year = year
      setYear('')
    }
    if (fuelType.length > 0) {
      newData[0].vehicleFuel = fuelType
      setFuelType('')
    }
    if (seats.length > 0) {
      newData[0].numberOfSeats = seats
      setSeats('')
    }
    if (price.length > 0) {
      newData[0].price = price
      setPrice('')
    }
    if (vehiclesCount.length > 0) {
      newData[0].countVehicles = vehiclesCount
      setVehiclesCount('')
    }
    console.log(newData)
    fetch('http://localhost:5000/vehicles', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    })
  }

  // Rent event
  const [showRent, setShowRent] = useState(false)
  const handleCloseRent = () => setShowRent(false)

  const handleShowRent = () => setShowRent(true)

  const [rentEvent, setRentEvent] = useState({})

  const [startDate, setStartDate] = useState(new Date())

  const [endDate, setEndDate] = useState(new Date())

  const handleStartDate = e => {
    setStartDate(e.target.value)
  }

  const handleEndDate = e => {
    setEndDate(e.target.value)
  }

  const rentCar = e => {
    handleShowRent()
  }

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')

  const handleName = e => {
    setName(e.target.value)
  }
  const handleEmail = e => {
    setEmail(e.target.value)
  }

  const handlePhone = e => {
    setPhone(e.target.value)
  }
  let custObject = { name, email, phone }

  const handleCloseRent2 = e => {
    setRentEvent(JSON.parse(e.target.name))
    /*
    setShowRent(false)
    const dayOfYear = date =>
      Math.floor(
        (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
      )
    let startRent = dayOfYear(new Date(startDate))
    let endRent = dayOfYear(new Date(endDate))
    setEndDate('')
    setStartDate('')
    */

    let customer = customers.filter(cust => cust.fullName === custObject.name)
    customer[0].rentals.push(rentEvent)
    console.log(customer[0])

    fetch('http://localhost:5000/customers', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rentEvent)
    })
  }
  return (
    <div className='container-fleet'>
      {isReady ? (
        <div className='cars-container'>
          {cars.map((item, index) => {
            return (
              <Card
                style={{
                  width: '18rem',
                  border: 'none',
                  boxShadow: '3px 3px 12px #ccc',
                  borderRadius: '10px'
                }}
                key={item._id}
              >
                <Card.Img
                  variant='bottom'
                  src={NoImage}
                  width='150px'
                  height='200px'
                  style={{ borderRadius: '9px' }}
                />
                <Card.Body>
                  <Card.Title>
                    {item.vehicleType.toUpperCase()}, {item.brand}
                  </Card.Title>
                  <Card.Text>
                    Model: {item.model}, Year: {item.year}, Fuel:{' '}
                    {item.vehicleFuel} , Seats: {item.numberOfSeats}, Price per
                    day: {item.price} , Available vehicles:
                    {item.countVehicles}
                  </Card.Text>
                  <Modal show={showRent} onHide={handleCloseRent}>
                    <Modal.Header closeButton>
                      <Modal.Title>Rent</Modal.Title>
                    </Modal.Header>
                    <div className='modal-inputs dates'>
                      <div className='date'>
                        <label>Start Date</label>
                        <input type='date' onChange={handleStartDate} />
                      </div>
                      <div className='date'>
                        <label>End date</label>
                        <input type='date' onChange={handleEndDate} />
                      </div>
                      <div className='customer-info'>
                        <h4>Customer </h4>
                        <input
                          type='text'
                          placeholder='Fullname'
                          onChange={handleName}
                        />
                        <input
                          type='text'
                          placeholder='Email'
                          onChange={handleEmail}
                        />
                        <input
                          type='text'
                          placeholder='Phone number'
                          onChange={handlePhone}
                        />
                      </div>
                    </div>
                    <Modal.Footer>
                      <Button variant='secondary' onClick={handleCloseRent}>
                        Close
                      </Button>
                      <Button
                        variant='primary'
                        onClick={handleCloseRent2}
                        name={JSON.stringify(item)}
                      >
                        Rent
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <div className='buttons-container'>
                    <Button
                      variant='primary'
                      onClick={rentCar}
                      name={JSON.stringify(item)}
                    >
                      Rent
                    </Button>
                    <Button
                      variant='success'
                      onClick={handleShow}
                      name={JSON.stringify(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant='danger'
                      onClick={deleteVehicle}
                      name={JSON.stringify(item)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            )
          })}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit vehicle</Modal.Title>
            </Modal.Header>
            <div className='modal-inputs'>
              <input
                className='inpt'
                placeholder='New type'
                onChange={handleType}
              />
              <input
                className='inpt'
                placeholder='New brand'
                onChange={handleBrand}
              />
              <input
                className='inpt'
                placeholder='New model'
                onChange={handleModel}
              />
              <input
                className='inpt'
                placeholder='Construction year'
                onChange={handleYear}
              />
              <input
                className='inpt'
                placeholder='Fuel type'
                onChange={handleFuelType}
              />
              <input
                className='inpt'
                placeholder='Number of seats'
                onChange={handleSeats}
              />
              <input
                className='inpt'
                placeholder='New price'
                onChange={handlePrice}
              />
              <input
                className='inpt'
                placeholder='Available vehicles'
                onChange={handleVehicleCount}
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
        </div>
      ) : (
        <div className='spinner'>{spinner()}</div>
      )}
    </div>
  )
}
