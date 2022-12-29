import axios from 'axios'
import { useMemo, useEffect, FormEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { validateEmail } from 'utils/validate'

import styles from './signUp.module.scss'

const SignUp = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

  const isValidEmail = useMemo(() => validateEmail(email), [email])

  useEffect(() => {
    if (isValidEmail && password.length >= 8) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [email, isValidEmail, password.length])

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    axios
      .post('http://localhost:8080/users/create', {
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
    <form onSubmit={handleSubmit} className={styles.container}>
      <div>
        <label htmlFor='email-input'>이메일</label>
        <input type='email' name='email-input' value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        {!isValidEmail && <span>유효한 이메일을 입력해주세요.</span>}
      </div>
      <div>
        <label htmlFor='password-input'>비밀번호</label>
        <input
          type='password'
          name='password-input'
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        {password.length < 8 && <span>비밀번호를 8자 이상 입력해주세요.</span>}
      </div>
      <button type='submit' disabled={isDisabled}>
        회원가입
      </button>
    </form>
  )
}

export default SignUp
