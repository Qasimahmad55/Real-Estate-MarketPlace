import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { uploadToAppwrite, getFile } from '../utils/appwrite'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserSuccess, signOutUserFailure } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
const API_BASE = import.meta.env.VITE_BACKEND_ENDPOINT

function Profile() {
  const fileRef = useRef(null)
  const dispatch = useDispatch()
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [showListingError, setShowListingError] = useState(false)
  const [userListings, setUserListings] = useState([])
  const { currentUser, loading, error } = useSelector(state => state.user)
  const [formData, setFormData] = useState({
    username: currentUser.username || '',
    email: currentUser.email || '',
    avatar: currentUser.avatar || '',
    password: ''
  })
  // console.log(formData.avatar);
  // console.log(currentUser.avatar);

  // console.log(currentUser);
  // console.log(formData);
  // console.log(avatarUrl);

  const handleUploadImage = async (e) => {
    try {
      const file = e.target.files[0]
      if (file) {
        const response = await uploadToAppwrite(file)
        const fileId = response.$id
        // console.log(response);
        const gettingFile = await getFile(fileId)
        // console.log(fileId);

        // console.log(gettingFile);
        setFormData(prev => ({ ...prev, avatar: gettingFile }))
      }
    } catch (error) {
      console.log("upload failed", error)
    }
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await fetch(`${API_BASE}/api/user/update/${currentUser._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      )
      const data = await res.json()
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return;
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }
  const handleDeletion = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`${API_BASE}/api/user/delete/${currentUser._id}`, {
        method: "DELETE"
      })
      const data = res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  const handleSignout = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch(`${API_BASE}/api/auth/signout`)
      const data = res.json()
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message))
        return
      }
      dispatch(signOutUserSuccess(data))
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
  }
  const handleShowListings = async () => {
    try {
      setShowListingError(false)
      const res = await fetch(`${API_BASE}/api/user/listings/${currentUser._id}`)
      const data = await res.json()
      if (data.success === false) {
        setShowListingError(true)
        return
      }
      setUserListings(data)
    } catch (error) {
      setShowListingError(true)
    }
  }
  const handleDelteListing = async (listingId) => {
    try {
      const res = await fetch(`${API_BASE}/api/listing/delete/${listingId}`,
        {
          method: "DELETE"
        }
      )
      const data = res.json()
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId))
    } catch (error) {
      console.log(error.message);

    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="file"
          ref={fileRef}
          hidden accept='image/*'
          onChange={handleUploadImage}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar} alt="Profile Image"
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <input
          type="text" placeholder='Username' id='username'
          className='p-3 border border-gray-300 rounded-lg'
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="text" placeholder='Email' id='email'
          className='p-3 border border-gray-300 rounded-lg'
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password" placeholder='Password' id='password'
          className='p-3 border border-gray-300 rounded-lg'
          value={formData.password}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-70' >
          {loading ? "Loading..." : "Update"}</button>
        <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-90'
          to={"/create-listing"} >
          Create Listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeletion} className='text-red-700 cursor-pointer'>Delete account</span>
        <span onClick={handleSignout} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ""}</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? "User Updated Successfully" : ""}</p>
      <button
        onClick={handleShowListings}
        className='text-green-700 w-full outline-none'>Show Listings</button>
      <p className='text-red-700 mt-5'>{showListingError ? "Error showing listings" : ""}</p>
      {userListings && userListings.length > 0 &&
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-5 text-2xl font-semibold'>Your Listings</h1>
          {userListings.map((listing) =>
          (
            <div
              key={listing._id}
              className='border border-gray-300 rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img className='h-16 w-16 object-contain'
                  src={listing.imageUrls[0]} alt="listing image" />
              </Link>
              <Link
                className='text-slate-700 font-semibold flex-1 hover:underline truncate'
                to={`/listing/${listing._id}`}>
                <p  >{listing.name}</p>
              </Link>
              <div className='flex flex-col '>
                <button
                  onClick={() => handleDelteListing(listing._id)}
                  className='text-red-700 uppercase'>Delete</button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>

      }
    </div>
  )
}

export default Profile