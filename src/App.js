import logo from './logo.svg';
import './App.css';
import app from './firebase';
import firebaseservice from './firebase';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import React, {useEffect, useState} from 'react';
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL, uploadBytes} from "firebase/storage";


// Get a reference to the storage service, which is used to create references in your storage bucket

function App() {
  console.log(firebaseservice)

  const [image, setImage] = useState(null)
  const [url, setUrl] = useState('')

  const auth = getAuth(firebaseservice);
  const storage = getStorage(firebaseservice);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log('data state user', user)
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  },[])

  useEffect(() => {
    const listRef = ref(storage);
    console.log(listRef)

    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        console.log('res',res)
        res.prefixes.forEach((folderRef) => {
          console.log('folder',folderRef)
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.
        });
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
  }, [])


  const signOutFunction = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('berhasil logout')
    }).catch((error) => {
      // An error happened.
      console.log('gagal Logout')
    });
    
  }

  const downloadFile = () => {
    getDownloadURL(ref(storage, '_.jpg'))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    // console.log(url)
    // const xhr = new XMLHttpRequest();
    // xhr.responseType = 'blob';
    // xhr.onload = (event) => {
    //   const blob = xhr.response;
    // };
    // xhr.open('GET', url);
    // xhr.send();
    fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = 'kdlskdls';
      link.click();
  })
  .catch(console.error);

    // // Or inserted into an <img> element
    // const img = document.getElementById('myimg');
    // img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
    console.log(error)
  });
  }


  const Register = async(event) => {
    event.preventDefault()
    console.log(event)
    const {email, password} = event.target.elements
    console.log(email)
    console.log(password)

    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }


 const handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
     
      setImage(image)
    }
  }
  const handleUpload = () => {
    //   const uploadTask = storage.ref(`images/${image.name}`).put(image);
    //   uploadTask.on('state_changed', 
    //   (snapshot) => {
    //     // progrss function ....
    //     const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    //     this.setState({progress});
    //   }, 
    //   (error) => {
    //        // error function ....
    //     console.log(error);
    //   }, 
    // () => {
    //     // complete function ....
    //     storage.ref('images').child(image.name).getDownloadURL().then(url => {
    //         console.log(url);
    //         this.setState({url});
    //     })
    // });
    const storageRef = ref(storage, 'IMAGES/test.jpg')
    uploadBytes(storageRef, image).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
    
  }

  return (
   
    <div>
      <form onSubmit={Register}>
        <label>
          email
        </label>
        <input name='email' type='email' placeholder="Email"/>

        <label>
          password
        </label>
        <input name='password' type='password' placeholder="Password"/>
        <button type="submit">Daftar</button>
      </form>

      <button onClick={() => signOutFunction()}>log out</button>
      <button onClick={() => downloadFile()}>download</button>

      <input type="file" onChange={handleChange}/>
        <button onClick={() => handleUpload()}>Upload</button>
    </div>
  );
}

export default App;
