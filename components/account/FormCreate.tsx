import React, { useState } from 'react'

const FormCreate = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  const submitFields = async (event: React.SyntheticEvent) => {

    event.preventDefault()

    try {
      const body = { name, email, pass }
      const response = await fetch('api/user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })
      if (response.ok) {
        const message = await response.json()
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
    <form onSubmit={submitFields}>
      <label htmlFor="fc_name">Name</label>
      <input type="text" id="fc_name" name="name" placeholder="*" onKeyUp={event => handleChange(event, setName)} />
      <label htmlFor="fc_email">Email</label>
      <input type="email" id="fc_email" name="email" placeholder="*" onKeyUp={event => handleChange(event, setEmail)} />
      <label htmlFor="fc_pass">Password</label>
      <input type="password" id="fc_pass" name="pass" placeholder="*" onKeyUp={event => handleChange(event, setPass)} />
      <input disabled={!name || !email} type="submit" value="Create" />
      { error && <div>{error}</div>}
    </form>
  )

}

export default FormCreate