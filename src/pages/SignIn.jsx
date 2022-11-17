import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { app, db } from '../firebase.config'
import { toast } from 'react-toastify'
import OAuth from '../components/OAuth'


function SignIn() {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { email, password } = formData

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
      const auth = getAuth(app)

      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      if (userCredential.user) {
        const user = userCredential.user

        const updateTimestamp = await updateDoc(doc(db, "users", user.uid), {
          timestamp: serverTimestamp()
        })
  
        console.log(user)
        navigate("/")
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error.code)
      console.log(error.message)
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
          <input type='email' placeholder="Email" className="emailInput" id="email" value={email} onChange={onChange} />
          <div className='passwordInputDiv'>
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} className="passwordInput" id='password' onChange={onChange} />
            <img src={visibilityIcon} className='showPassword' onClick={() => { setShowPassword((prevState) => !prevState) }} />
          </div>
          <Link to='/forgot-password' className="forgotPasswordLink">Forgot Password</Link>
          <div className="signInBar">
            <p className="signInText">
              Sign In
            </p>
            <button className="signInButton" type='submit'>
              <ArrowRightIcon fill='white' width='34px' height="34px" />
            </button>
          </div>
        </form>
        <OAuth />
        <Link to="/sign-up" className='registerLink'>
          Sign Up Instead
        </Link>
      </main>
    </div>
  )
}

export default SignIn