import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { AuthActions } from '../../store/Auth'
import { useHistory } from 'react-router-dom'
import classes from './AuthForm.module.css'

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const emailInput = useRef()
  const passInput = useRef()
  const dispatch = useDispatch()
  const navigatge = useHistory()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState)
  }
  const submitHandler = (event) => {
    event.preventDefault()
    const email = emailInput.current.value
    const password = passInput.current.value
    emailInput.current.value = ''
    passInput.current.value = ''
    if (isLogin) {
      const signIn = async () => {
        const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCSzBO2VSRTmaMHZbyAf3vdwa-62cpudIc',
          {
            method: 'POST',
            body: JSON.stringify({
              email,
              password,
              returnSecureToken: true,
            }),
          }
        )
        const data = await response.json()
        if (!response.ok) {
          alert(data.error.message)
          throw new Error(data.error.message)
        } else {
          dispatch(AuthActions.Login(data.idToken))
          navigatge.replace('/')
        }
      }
      signIn().catch((err) => {
        console.log(err)
      })
    } else {
      const signUp = async () => {
        const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyCSzBO2VSRTmaMHZbyAf3vdwa-62cpudIc',
          {
            method: 'POST',
            body: JSON.stringify({
              email,
              password,
              returnSecureToken: true,
            }),
          }
        )
        const data = await response.json()
        if (!response.ok) {
          emailInput.current.value = ''
          passInput.current.value = ''
          console.log(data.error.message)
        } else {
          setIsLogin(true)
        }
      }
      signUp().catch((err) => {
        console.log(err)
        emailInput.current.value = ''
        passInput.current.value = ''
      })
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInput} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passInput} required />
        </div>
        <div className={classes.actions}>
          <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AuthForm
