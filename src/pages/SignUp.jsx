import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase.config"
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { toast } from "react-toastify"
import OAuth from '../components/OAuth';


function SignUp() {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const { email, password, name} = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    e.preventDefault()
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.accountCreated = serverTimestamp()
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate("/")
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <div className="pageContainer">
      <header>
        <p className='pageHeader'>
          Welcome Back!
        </p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
        <input type='text' placeholder="Name" className="nameInput" id="name" value={name} onChange={onChange} />
          <input type='email' placeholder="Email" className="emailInput" id="email" value={email} onChange={onChange} />
          <div className='passwordInputDiv'>
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} className="passwordInput" id='password' onChange={onChange} />
            <img src={visibilityIcon} className='showPassword' onClick={() => { setShowPassword((prevState) => !prevState) }} />
          </div>
          <Link to='/forgot-password' className="forgotPasswordLink">Forgot Password</Link>
          <div className="signUpBar">
            <p className="signUpText">
              Sign Up
            </p>
            <button className="signUpButton" type='submit'>
              <ArrowRightIcon fill='white' width='34px' height="34px" />
            </button>
          </div>
        </form>
        <OAuth />
        <Link to="/sign-in" className='registerLink'>
          Sign In Instead
        </Link>
      </main>
    </div>
  )
}

export default SignUp