import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg"

function ForgotPassword() {

  const [email, setEmail] = useState("")
  const auth = getAuth()

  const onChange = (e) => {
    e.preventDefault()

    setEmail(e.target.value)
  }

  const onSubmit = async (e) => {
    try {
      await sendPasswordResetEmail(auth, email)
      toast.success("Email was sent")
    } catch (error) {
      toast.error(error.message)
    }
  } 

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
      <form onSubmit={onSubmit}>
      <input type="email" placeholder="Email" value={email} className="emailInput" id='email' onChange={onChange} />
      <Link className='forgotPasswordLink' to='/sign-in'>Sign in</Link>

      <div className="signInBar">
        <div className="signInText">Send Reset Link</div>
        <button className="signInButton" type='submit'>
          <ArrowRightIcon fill="#ffffff" width='34px' height='34px'/>
        </button>
      </div>
      </form>
      </main>

    </div>
  )
}

export default ForgotPassword