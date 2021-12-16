import firebaseAdmin from 'firebase-admin'
import path from 'path'
import { appStorage } from '../config'
import 'dotenv/config'

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(path.join(__dirname, '../../../newsfeed-firebase.json'))
})
const storage = admin.storage()

export const uploadFile = async (path: string, filename: string): Promise<string> => {
  const file = await storage.bucket(appStorage.bucket).upload(path, {
    public: true,
    destination: `/uploads/${filename}`
  })

  const signedUrl = (await file[0].getSignedUrl({
    action: 'read',
    expires: '03-09-5000'
  }))[0]
  return signedUrl.split(filename)[0] + filename
}
