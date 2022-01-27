import { Link, useHistory } from 'react-router-dom'
import classes from './MainNavigation.module.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { AuthActions } from '../../store/Auth'
const MainNavigation = () => {
  const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn)
  const dispatch = useDispatch()
  const navigate = useHistory()
  const LogoutHandler = () => {
    dispatch(AuthActions.logout())
    navigate.replace('/auth')
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button type='button' onClick={LogoutHandler}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
