import { initializeApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'

export default (): Firestore => {
  const config = useRuntimeConfig()

  const firebaseConfig = {
    apiKey: config.public.apiKey,
    authDomain: config.public.authDomain,
    projectId: config.public.projectId,
    storageBucket: config.public.storageBucket,
    messagingSenderId: config.public.messagingSenderId,
    appId: config.public.appId,
    measurementId: config.public.measurementId
  }

  const firebase = initializeApp(firebaseConfig)
  const db: Firestore = getFirestore(firebase)

  return db
}