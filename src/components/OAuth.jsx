import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase.config'
import googleIcon from "../assets/svg/googleIcon.svg"



function OAuth() {

    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            const docRef = doc(db, 'users', user.uid)
            const snapshot = await getDoc(docRef)
            
            if (!snapshot.exists()) {
                // if user doesnt exist create a user in db
                const userCred = await setDoc(doc(db, "users", user.uid), {
                    timestamp: serverTimestamp(),
                    accountCreated: serverTimestamp(),
                    name: user.displayName,
                    email: user.email,
                })
            } else {
                const updateTimestamp = await updateDoc(doc(db, "users", user.uid), {
                    timestamp: serverTimestamp()
                })
            }
            navigate("/")
        } catch (error) {
            toast.error(error.message)
        }

    }

  return (
    <div className='socialLogin'>
        <p>Sign {location.pathname === "/sign-up" ? "up" : "in"} with</p>
        <button className="socialIcon div">
            <img classname="socialIconImg"src={googleIcon} alt="google icon" onClick={onGoogleClick}/>
        </button>
    </div>
  )
}

export default OAuth