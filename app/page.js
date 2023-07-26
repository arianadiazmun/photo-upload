"use client"
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [file, setFile] = useState()
  const handleFile = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='text-3xl font-bold'>Upload a photo</h1>
      <input type='file' accept='image/*'onChange={handleFile}/>
      {file &&
      
      <div className="w-1/2 h-1/2 rounded">
        <h2 className='text-xl font-semibold'>Image from computer ARI</h2>
       <p>{file.name}</p>
       <img src={URL.createObjectURL(file)} className='object-cover'/>
       </div>
       
       }
    </main>
  )
}
