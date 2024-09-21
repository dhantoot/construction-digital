import { boot } from 'quasar/wrappers'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
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
import {
  getStorage,
  ref as _ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  uploadString,
  listAll
} from 'firebase/storage'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
// createUserWithEmailAndPassword

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app } /* { app, router, ... } */) => {
  // something to do
  const firebaseConfig = {
    apiKey: 'AIzaSyBXkBtP1S7AYU4fd7sFV0hcy-LDmrghkcU',
    authDomain: 'hofstee-app.firebaseapp.com',
    databaseURL:
      'https://hofstee-app-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'hofstee-app',
    storageBucket: 'hofstee-app.appspot.com',
    messagingSenderId: '478665878321',
    appId: '1:478665878321:web:4caa9c15ba4a9e99955e10',
    measurementId: 'G-7LP3N62QZ8'
  }
  const firebaseApp = initializeApp(firebaseConfig)
  const auth = getAuth()
  const storage = getStorage(firebaseApp)

  firebaseApp.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = firebaseApp.auth().onAuthStateChanged((user) => {
        unsubscribe()
        resolve(user)
      }, reject)
    })
  }

  // Get a reference to the database service
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
  const users = fireRef(db, 'user')
  onValue(users, (snapshot) => {
    const data = snapshot.val()
    console.log({ data })
  })
})
