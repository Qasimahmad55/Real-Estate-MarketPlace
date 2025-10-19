import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { uploadToAppwrite, getFile } from '../utils/appwrite'

function Profile() {
  const fileRef = useRef(null)
  const { currentUser } = useSelector(state => state.user)
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar)
  const handleUploadImage = async (e) => {
    try {
      const file = e.target.files[0]
      if (file) {
        const response = await uploadToAppwrite(file)
        const fileId = response.$id
        // console.log(response);
        const gettingFile = getFile(fileId)
        // console.log(gettingFile);
        setAvatarUrl(gettingFile)
      }
    } catch (error) {
      console.log("upload failed", error)
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type="file" ref={fileRef} hidden accept='images/*'
          onChange={handleUploadImage}
        />
        <img onClick={() => fileRef.current.click()} src={avatarUrl} alt="Profile Image"
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <input type="text" placeholder='Username' id='username'
          className='p-3 border border-gray-300 rounded-lg' />
        <input type="text" placeholder='Email' id='email'
          className='p-3 border border-gray-300 rounded-lg' />
        <input type="text" placeholder='Password' id='password'
          className='p-3 border border-gray-300 rounded-lg' />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-70' >update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}

export default Profile