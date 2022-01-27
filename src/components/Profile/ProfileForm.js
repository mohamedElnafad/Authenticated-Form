import classes from './ProfileForm.module.css'
import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
const ProfileForm = () => {
  const [passInput, setPassInput] = useState('')
  const token = useSelector((state) => state.Auth.token)
  console.log(passInput)
  const inputHandler = (event) => {
    setPassInput(event.target.value)
  }

  const submitHandler = useCallback(
    (event) => {
      event.preventDefault()
      const newPassword = passInput
      const changePassword = async () => {
        const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCSzBO2VSRTmaMHZbyAf3vdwa-62cpudIc',
          {
            method: 'POST',
            body: JSON.stringify({
              idToken: token,
              password: newPassword,
              returnSecureToken: false,
            }),
          }
        )
        const data = await response.json()
        if (!response.ok) {
          console.log(data.error.message)
        }
        setPassInput('')
      }
      changePassword()
    },
    [passInput, token]
  )

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          type='password'
          id='new-password'
          value={passInput}
          onChange={inputHandler}
          minLength={6}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  )
}

export default React.memo(ProfileForm)
