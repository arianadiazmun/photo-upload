"use client"
import { useState } from 'react'
import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBG5kFm1t-KVVSWI5GgD-E46Uk7pF2pw8w",
  authDomain: "my-first-firestore-ad06-19.firebaseapp.com",
  projectId: "my-first-firestore-ad06-19",
  storageBucket: "my-first-firestore-ad06-19.appspot.com",
  messagingSenderId: "695007409435",
  appId: "1:695007409435:web:c31c0a1ae630c1ab514fbe"
};


export default function Home() {
  const [file, setFile] = useState()
  const [uploadedFile, setUploadedFile] = useState()

  const handleFile = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
    const app = initializeApp(firebaseConfig);// connects to our project 
    const storage = getStorage(app)// connects to storage
    //create a reference to our file in storage using filename
    const filename = e.target.files[0].name
    const imageRef = ref(storage, 'photos/' + filename)
    //then use todd's hack to get the URL for that file
    const url = `https://firebasestorage.googleapis.com/v0/b/my-first-firestore-ad06-19.appspot.com/o/photos%2F${filename}?alt=media`
    //upload
    uploadBytes(imageRef, e.target.files[0])
    .then(()=> setUploadedFile(url))
    .catch(alert)
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
      {uploadedFile &&
      
      <div className="w-1/2 h-1/2 rounded">
        <h2 className='text-xl font-semibold'>Image from Storage:</h2>
       <p>{file.name}</p>
       <img src={uploadedFile} className='object-cover'/>
       </div>
       
       }
    </main>
  )
}
