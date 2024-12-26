import Firebase from 'firebase/compat/app'
import { boot } from 'quasar/wrappers'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase Database Instance:
import {
  getDatabase,
  ref as fireRef,
  get,
  set,
  push,
  onValue,
  update,
  serverTimestamp
} from 'firebase/database'

// Firebase Storage Instance:
import {
  getStorage,
  ref as _ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  uploadString,
  listAll
} from 'firebase/storage'

// Firebase FireStore Instance:
import {} from 'firebase/firestore'

// Firebase Auth Instance:
import {
  getAuth,
  sendPasswordResetEmail,
  // signInWithRedirect,
  // getRedirectResult,
  GoogleAuthProvider
} from 'firebase/auth'

const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_DATABASE_URL,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_MEASUREMENT_ID
} = import.meta.env

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: VITE_FIREBASE_DATABASE_URL,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID,
  measurementId: VITE_FIREBASE_MEASUREMENT_ID
}

Firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = Firebase.auth().onAuthStateChanged(user => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app } /* { app, router, ... } */) => {
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig)

  // Get a reference to firebase auth
  const auth = getAuth()

  const provider = new GoogleAuthProvider()
  // provider.addScope('profile')
  // provider.addScope('email')

  // getRedirectResult(auth).then((result) => {
  //   if (result) {
  //     console.log('Signed in user:', result.user)
  //   } else {
  //     console.log('No user signed in')
  //   }
  // }).catch((error) => {
  //   console.error('Error handling redirect result:', error)
  // })

  // firebaseApp.getCurrentUser = () => {
  //   return new Promise((resolve, reject) => {
  //     const unsubscribe = firebaseApp.auth().onAuthStateChanged((user) => {
  //       unsubscribe()
  //       resolve(user)
  //     }, reject)
  //   })
  // }

  // Get a reference to the database service
  const storage = getStorage(firebaseApp)
  const db = getDatabase(firebaseApp)

  // default storage ref
  const storageRef = _ref(storage, 'files')

  app.config.globalProperties.$firebase = firebaseApp
  app.config.globalProperties.$fbdb = db
  app.config.globalProperties.$fbref = fireRef
  app.config.globalProperties.$fbget = get
  app.config.globalProperties.$fbset = set
  app.config.globalProperties.$fbpush = push
  app.config.globalProperties.$fbupdate = update
  app.config.globalProperties.$fbonValue = onValue
  app.config.globalProperties.$fbauth = auth
  app.config.globalProperties.$provider = provider
  app.config.globalProperties.$fbstorage = storage
  app.config.globalProperties.$fbstorageref = _ref
  app.config.globalProperties.$storageRef = storageRef
  app.config.globalProperties.$storageListAll = listAll
  app.config.globalProperties.$fbuploadbytes = uploadBytes
  app.config.globalProperties.$uploadbytesresumable = uploadBytesResumable
  app.config.globalProperties.$getdownloadurl = getDownloadURL
  app.config.globalProperties.$fbuploadstring = uploadString
  app.config.globalProperties.$fbsendPasswordResetEmail = sendPasswordResetEmail
  app.config.globalProperties.$serverTimestamp = serverTimestamp()
  app.config.globalProperties.$getFilePath = (filename) => {
    const starsRef = _ref(storage, filename) // files/1x1_me.jpeg
    return getDownloadURL(starsRef)
      .then((url) => {
        return url
      })
      .catch((error) => {
        console.log('error', error)
        return ''
      })
  }
  // app.config.globalProperties.$signInWithGoogle = async () => {
  //   try {
  //     const resp = await signInWithRedirect(auth, provider)
  //     console.log({ resp })
  //   } catch (error) {
  //     console.error('Error signing in:', error)
  //   }
  // }

  // Firebase.getCurrentUser = () => {
  //   return new Promise((resolve, reject) => {
  //     const unsubscribe = Firebase.auth().onAuthStateChanged(user => {
  //       unsubscribe()
  //       resolve(user)
  //     }, reject)
  //   })
  // }

  // createUserWithEmailAndPassword(auth, 'dt@yopmail.com', '12345678')
  //   .then(userCredential => {
  //     console.log('Auth Successfull', userCredential)
  //   })
  //   .catch(error => {
  //     console.log({ error })
  //   })

  // ================================ E X A M P L E S =============================================>
  // List Users
  // -------------------------------------
  // const users = fireRef(db, 'user')
  // onValue(users, (snapshot) => {
  //   const data = snapshot.val()
  //   console.log('boot: firebase users', { data })
  // })
})
