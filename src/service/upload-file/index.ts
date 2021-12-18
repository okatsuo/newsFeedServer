import 'dotenv/config'
import { FileUpload } from 'graphql-upload'
import firebaseAdmin from 'firebase-admin'
import path from 'path'

import { appStorage } from '../../shared/config'

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(path.join(__dirname, '../../../newsfeed-firebase.json'))
})
const storage = admin.storage()

export const uploadFile = async (bucketFolder: string, file: Promise<FileUpload>): Promise<any> => { // TODO how to set return to string ?
  try {
    const { createReadStream, mimetype } = await file

    const allowedFiles = ['image/jpeg', 'image/png', 'image/svg']
    if (!allowedFiles.includes(mimetype)) throw new Error('Tipo de imagem não permitida...')

    const filename = `${Date.now()}.${mimetype.split('/')[1]}`
    return await new Promise((resolve, reject) => createReadStream()
      .pipe(
        storage
          .bucket(appStorage.bucket)
          .file(`${bucketFolder}/${filename}`)
          .createWriteStream({
            resumable: false,
            gzip: true
          })
      )
      .on('finish', () => {
        storage
          .bucket(appStorage.bucket)
          .file(`${bucketFolder}/${filename}`)
          .makePublic()
          .then(async (e) => {
            resolve(
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              appStorage.bucket && `https://storage.googleapis.com/${appStorage.bucket}/${e[0].object}`
            )
          })
          .catch((err) => {
            reject(err)
          })
      })
      .on('error', (err) => reject(err)))
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
  }
}
