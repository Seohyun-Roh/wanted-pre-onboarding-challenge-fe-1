import axios from 'axios'
import { useMemo, useEffect, FormEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SERVER_URL } from 'constants/todo'
import { validateEmail } from 'utils/validate'

import styles from './signUp.module.scss'

const SignUp = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValidInfo, setIsValidInfo] = useState(false)

  const isValidEmail = useMemo(() => validateEmail(email), [email])

  useEffect(() => {
    setIsValidInfo(isValidEmail && password.length >= 8)
  }, [email, isValidEmail, password.length])

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    axios
      .post(`${SERVER_URL}/users/create`, {
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

        if (response.data.details === '이미 존재하는 유저입니다') {
          navigate('/sign-in')
        }
      })
  }

  return (
    <main className={styles.pageContainer}>
      <h1>Create an account</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <label htmlFor='email-input'>Email</label>
          <input type='email' name='email-input' value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        </div>
        <p className={styles.inputMessage}>{!isValidEmail && 'Please enter a valid email.'}</p>
        <div className={styles.inputBox}>
          <label htmlFor='password-input'>Password</label>
          <input
            type='password'
            name='password-input'
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <p className={styles.inputMessage}>
          {password.length < 8 && 'Please enter at least 8 characters of password.'}
        </p>
        <button type='submit' disabled={!isValidInfo} className={styles.submitButton}>
          Create account
        </button>
      </form>
    </main>
  )
}

export default SignUp
