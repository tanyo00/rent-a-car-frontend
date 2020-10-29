import React, { useState } from 'react'
import { errMessage, success } from './Messages'

export default function Vehicle () {
  const [state, setState] = useState({})

  const handleType = e => {
    setState({ ...state, vehicleType: e.target.value })
  }
  const handleBrand = e => {
    setState({ ...state, brand: e.target.value })
  }

  const handleModel = e => {
    setState({ ...state, model: e.target.value })
  }

  const handleYear = e => {
    setState({ ...state, year: e.target.value })
  }

  const handleFuel = e => {
    setState({ ...state, vehicleFuel: e.target.value })
  }

  const handleSeats = e => {
    setState({ ...state, numberOfSeats: e.target.value })
  }

  const handlePrice = e => {
    setState({ ...state, price: parseFloat(e.target.value) })
  }
  const handleVehicles = e => {
    setState({ ...state, countVehicles: parseInt(e.target.value) })
  }

  const [err, setErr] = React.useState(false)

  const [isSuccess, setIsSuccess] = React.useState(false)

  const addVehicle = e => {
    e.preventDefault()
    if (
      state.vehicleType === undefined ||
      state.brand === undefined ||
      state.model === undefined ||
      state.year === undefined ||
      state.vehicleFuel === undefined ||
      state.numberOfSeats === undefined ||
      state.price === undefined ||
      state.countVehicles === undefined
    ) {
      setErr(true)
    } else if (
      state.vehicleType.length === 0 ||
      state.brand.length === 0 ||
      state.model.length === 0 ||
      state.year.length === 0 ||
      state.vehicleFuel.length === 0 ||
      state.numberOfSeats.length === 0 ||
      state.price.length === 0 ||
      state.countVehicles.length === 0
    ) {
      setIsSuccess(false)
      setErr(true)
    } else {
      setErr(false)
      setIsSuccess(true)
      console.log(state)
      fetch('http://localhost:5000/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      })
    }
  }

  return (
    <div className='form'>
      <form className='container-inputs' onSubmit={addVehicle} id='myForm'>
        <h1>Add Vehicle</h1>
        <div className='input-style type'>
          <label>Vehicle type (economy, luxury, etc.)</label>
          <input type='text' onChange={handleType} />
        </div>
        <div className='input-style brand'>
          <label>Vehicle brand</label>
          <input type='text' onChange={handleBrand} />
        </div>
        <div className='input-style model'>
          <label>Vehicle model</label>
          <input type='text' onChange={handleModel} />
        </div>
        <div className='input-style year'>
          <label>Construction year</label>
          <input type='number' onChange={handleYear} />
        </div>
        <div className='input-style fuel'>
          <label>Fuel type (diesel, petrol)</label>
          <input type='text' onChange={handleFuel} />
        </div>
        <div className='input-style seats'>
          <label>Number of seats</label>
          <input type='number' onChange={handleSeats} />
        </div>
        <div className='input-style pic'>
          <label>Picture</label>
          <input type='file' name='vehicleImage' disabled />
        </div>
        <div className='input-style price'>
          <label>Price per day</label>
          <input type='number' onChange={handlePrice} />
        </div>
        <div className='input-style count'>
          <label>Number of available vehicles</label>
          <input type='number' onChange={handleVehicles} />
        </div>
        <button className='btn-create' type='submit'>
          Add vehicle
        </button>
        {err ? errMessage() : null}
        {isSuccess ? success() : null}
      </form>
    </div>
  )
}
