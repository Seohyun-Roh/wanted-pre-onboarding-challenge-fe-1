import axios from 'axios'
import { FormEventHandler, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { SERVER_URL } from 'constants/todo'
import { validateEmail } from 'utils/validate'

import styles from './signIn.module.scss'

const SignIn = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValidInfo, setIsValidInfo] = useState(false)

  const isValidEmail = useMemo(() => validateEmail(email), [email])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/')
    }
  }, [navigate])

  useEffect(() => {
    setIsValidInfo(isValidEmail && password.length >= 8)
  }, [email, isValidEmail, password.length])

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    axios
      .post(`${SERVER_URL}/users/login`, {
        email,
        password,
      })
      .then(({ data }) => {
        localStorage.setItem('token', data.token)
        navigate('/')
      })
      .catch(({ response }) => {
        // eslint-disable-next-line no-alert
        alert(response.data.details)
      })
  }

  return (
    <main className={styles.pageContainer}>
      <h1>Hey, Hello!</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <label htmlFor='email-input'>Email</label>
          <input type='email' name='email-input' value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        </div>
        <div className={styles.inputBox}>
          <label htmlFor='password-input'>Password</label>
          <input
            type='password'
            name='password-input'
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <button type='submit' disabled={!isValidInfo} className={styles.submitButton}>
          Sign In
        </button>
      </form>
    </main>
  )
}

export default SignIn
