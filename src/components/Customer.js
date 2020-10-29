import React, { useState } from 'react'
import '../styles/styles.css'
import { errMessage, success } from './Messages'

export default function Customer () {
  const [cust, setCust] = useState({})

  const handleName = e => {
    setCust({ ...cust, fullName: e.target.value })
  }
  const handleEmail = e => {
    setCust({ ...cust, email: e.target.value })
  }
  const handlePhone = e => {
    setCust({ ...cust, phone: e.target.value })
  }
  const [err, setErr] = useState(false)
  const [isOkay, setIsOkay] = useState(false)
  const addCustomer = e => {
    e.preventDefault()
    if (
      cust.fullName === undefined ||
      cust.email === undefined ||
      cust.phone === undefined
    ) {
      setErr(true)
    } else if (
      cust.fullName.length === 0 ||
      cust.email.length === 0 ||
      cust.phone.length === 0
    ) {
      setErr(true)
    } else {
      setErr(false)
      setIsOkay(true)
      fetch('http://localhost:5000/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cust)
      })
    }
  }

  return (
    <div className='create-customer-container' onSubmit={addCustomer}>
      <form className='register-customer'>
        <h1>Add customer</h1>
        <div className='style-container-input full-name'>
          <label>Full name</label>
          <input type='text' onChange={handleName} />
        </div>
        <div className='style-container-input email'>
          <label>Email address</label>
          <input type='email' onChange={handleEmail} />
        </div>
        <div className='style-container-input phone'>
          <label>Phone number</label>
          <input type='phone' onChange={handlePhone} />
        </div>
        <button className='btn-add-customer' type='submit'>
          Add customer
        </button>
        {err ? errMessage() : null}
        {isOkay ? success() : null}
      </form>
    </div>
  )
}
