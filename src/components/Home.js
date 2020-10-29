import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Button = styled(NavLink)`
  width: 300px;
  text-decoration: none;
  color: white;
  background-image: linear-gradient(
    to right,
    #16222a 0%,
    #3a6073 51%,
    #16222a 100%
  );
  margin: 10px;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 10px;
  display: block;
  &:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
  }
`
export default function Home () {
  return (
    <div className='home-page-container'>
      <main>
        <div className='items-header'>
          <div className='text'>
            <h2>A better way</h2>
            <h2>to rent a car.</h2>
            <p>
              Welcome! <br />
              You can easily create, update and browse some of the best car
              rentals.
            </p>
            <div className='buttons'>
              <Button to='/car-fleet'>Car fleet</Button>
              <Button to='/customers'>Browse customers</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
