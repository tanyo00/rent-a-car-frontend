import React from 'react'
import Navigation from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Vehicle from './components/Vehicle'
import Customer from './components/Customer'
import Home from './components/Home'
import CarFleet from './components/CarFleet'
import './styles/styles.css'
import BrowseCust from './components/BrowseCust'

export default function App () {
  return (
    <Router>
      <div>
        <Navigation />
        <Route exact path='/' component={Home} />
        <Route path='/add-vehicle' component={Vehicle} />
        <Route path='/add-customer' component={Customer} />
        <Route path='/car-fleet' component={CarFleet} />
        <Route path='/customers' component={BrowseCust} />
      </div>
    </Router>
  )
}
