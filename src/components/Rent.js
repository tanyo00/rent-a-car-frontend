import React, { useState } from 'react'

export default function Rent () {
  const [vehicles, setVehicles] = useState([])
  const [custs, setCusts] = useState([])

  React.useEffect(() => {
    fetch('http://localhost:5000/vehicles')
      .then(res => res.json())
      .then(data => setVehicles(data))

    fetch('http://localhost:5000/customers')
      .then(res => res.json())
      .then(data => setCusts(data))
  }, [])

  const [searchedVehicle, setSearchedVehicle] = useState({})

  const handleType = e => {
    setSearchedVehicle({ ...searchedVehicle, vehicleType: e.target.value })
  }
  const handleBrand = e => {
    setSearchedVehicle({ ...searchedVehicle, brand: e.target.value })
  }

  const handleModel = e => {
    setSearchedVehicle({ ...searchedVehicle, model: e.target.value })
  }

  const handleYear = e => {
    setSearchedVehicle({ ...searchedVehicle, year: e.target.value })
  }

  const handleFuel = e => {
    setSearchedVehicle({ ...searchedVehicle, vehicleFuel: e.target.value })
  }

  const handleSeats = e => {
    setSearchedVehicle({ ...searchedVehicle, numberOfSeats: e.target.value })
  }

  const handlePrice = e => {
    setSearchedVehicle({ ...searchedVehicle, price: e.target.value })
  }
  const handleVehicles = e => {
    setSearchedVehicle({ ...searchedVehicle, countVehicles: e.target.value })
  }

  const rentACar = e => {
    e.preventDefault()
    let searched = vehicles.filter(vehicle => vehicle === searchedVehicle)
    console.log(searched)
  }

  return (
    <div className='rent-car-container' onSubmit={rentACar}>
      <form className='rent-form'>
        <h1>Rent a car</h1>
        <div className='dates'>
          <div className='date'>
            <label>Start Date</label>
            <input type='date' />
          </div>
          <div className='date'>
            <label>End date</label>
            <input type='date' />
          </div>
        </div>
        <div className='inputs'>
          <h4>Vehicle</h4>
          <input
            type='text'
            placeholder='Vehicle type(luxury, economy, etc.)'
            onChange={handleType}
          />
          <input
            type='text'
            placeholder='Vehicle brand'
            onChange={handleBrand}
          />
          <input
            type='text'
            placeholder='Vehicle model'
            onChange={handleModel}
          />
          <input
            type='number'
            placeholder='Construction year'
            onChange={handleYear}
          />
          <input
            type='text'
            placeholder='Fuel type(diesel, benzin)'
            onChange={handleFuel}
          />
          <input
            type='number'
            placeholder='Number of seats'
            onChange={handleSeats}
          />
          <input
            type='number'
            placeholder='Price per day'
            onChange={handlePrice}
          />
          <input
            type='number'
            placeholder='Number of available vehicles'
            onChange={handleVehicles}
          />
          <h4>Customer</h4>
          <input type='text' placeholder="Customer's name" />
          <input type='text' placeholder="Customer's email" />
          <input type='text' placeholder="Customer's phone number" />
          <button type='submit'>Rent</button>
        </div>
      </form>
    </div>
  )
}
