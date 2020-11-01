import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const MyNavbar = styled(Navbar)`
  background-color: #29539b;
  background-image: linear-gradient(315deg, #29539b 0%, #1e3b70 74%);
`

const MyNavLink = styled(NavLink)`
  color: white;
  padding-bottom: 2px;
  padding: 10px;
  &:hover,
  &:active {
    text-decoration: none;
    color: lightgray;
  }
`
const Header = styled(NavLink)`
  font-family: 'Nunito Sans', sans-serif;
  padding: 10px;
  font-size: 25px;
  color: white;
  text-decoration: none;
  &:hover,
  &:active {
    text-decoration: none;
    color: lightgray;
  }
`
export default function Navigation () {
  return (
    <MyNavbar collapseOnSelect expand='lg' variant='dark' fixed='top'>
      <Header to='/'>Rent a Car.</Header>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <MyNavLink to='/'>Home</MyNavLink>
          <MyNavLink to='/add-vehicle'>Add Vehicle</MyNavLink>
          <MyNavLink to='/add-customer'>Add Customer</MyNavLink>
          <MyNavLink to='/car-fleet'>Car Fleet</MyNavLink>
          <MyNavLink to='/customers'>Browse Customers</MyNavLink>
        </Nav>
      </Navbar.Collapse>
    </MyNavbar>
  )
}
