import React from 'react'

type LogoutProps = {
  callback: Function
}

const ButtonLogout: React.FC<LogoutProps> = ({ callback }) => {

  const handleLogout = async () => {

    try {
      const response = await fetch('api/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        // body: JSON.stringify(body)
      })
      if (response.ok) {
        const message = await response.json()
        console.log(message)
        callback()
      } else {
        // setError('handle response!')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return <button onClick={handleLogout}>Logout</button>

}

export default ButtonLogout