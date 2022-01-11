import React, { useState } from 'react'
import styles              from './FormLogin.module.css'

type props = {
  callback: Function
}

const FormLogin: React.FC<props> = ({ callback }) => {

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  const submitFields = async (event: React.SyntheticEvent) => {

    event.preventDefault()

    try {
      const body = { email, pass }
      const response = await fetch('api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })
      if (response.ok) {
        const message = await response.json()
        callback()
        setError(message.message) // obvs not an error!
        // set Done && redirect with timeout!
      } else {
        setError('handle response!')
      }
    } catch (error) {
      console.error(error)
      setError(error)
    }

  }

  const handleChange = ({ target }, callback) => {
    setError('')
    callback(target.value)
  }

  return (
    <form onSubmit={submitFields} className={styles.form}>
      <label htmlFor="fc_email">Email</label>
      <input type="email" id="fc_email" name="email" placeholder="Email" onKeyUp={event => handleChange(event, setEmail)} />
      <label htmlFor="fc_pass">Password</label>
      <input type="password" id="fc_pass" name="pass" placeholder="Password" onKeyUp={event => handleChange(event, setPass)} />
      <input disabled={!email || !pass} type="submit" value="Login" />
      { error && <div>{error}</div>}
    </form>
  )
}

export default FormLogin