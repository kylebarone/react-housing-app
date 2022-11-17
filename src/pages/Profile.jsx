import React from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from "react-toastify"

function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()

  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const {name, email} = formData

  const onLogout = () => {
    auth.signOut()
    navigate("/sign-in")
  }

  const onSubmit = async (e) => {
    console.log("changed")
    try {
      if (auth.currentUser.displayName !== name) {
        const userRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(userRef, {
          name: name
        })

        await updateProfile(auth.currentUser, {
          displayName: name,
        })
      }
    } catch (error) {
       toast.error("Could note update profile details")
       console.log(error)
    }
    
  }

  const onChange = (e) => {
    e.preventDefault()
    console.log(changeDetails)
    if (setChangeDetails) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      })
    }
  }

  return (
    <div className='profile'>
      <header className="profileHeader">
        <p className="pageHeader">
          My Profile
        </p>
        <button className="logOut" type='button' onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p className="changePersonalDetails" onClick={() => {
            setChangeDetails((prevState) => !prevState)
            if (changeDetails) {
              onSubmit()
            }
          }}>{changeDetails ? "done" : "change"}</p>
        </div>
        <div className="profileCard">
          <form>
            <input type="text" id="name" value={name} onChange={onChange} placeholder={name} className={!changeDetails ? "profileName" : "profileNameActive"} disabled={!changeDetails}/>
            <input type="email" id="email" value={email} onChange={onChange} placeholder={email} className={!changeDetails ? "profileEmail" : "profileEmailActive"}/>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Profile