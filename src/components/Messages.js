import React from 'react'
import { Alert } from 'react-bootstrap'
import { Spinner } from 'react-bootstrap'

export const errMessage = () => (
  <Alert variant='danger'>Please fill all fields of the form!</Alert>
)

export const success = () => (
  <Alert variant='success'>Customer successfully created!</Alert>
)

export const spinner = () => <Spinner animation='border' />
