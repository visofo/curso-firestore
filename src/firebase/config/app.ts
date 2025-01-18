import { config } from 'dotenv'
import { initializeApp } from 'firebase/app'

const resultado = config()
if(resultado.error) throw resultado.error

const app = initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID,
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN
})

export default app