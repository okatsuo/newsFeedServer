import 'dotenv/config'
import { FileUpload } from 'graphql-upload'
import firebaseAdmin, { ServiceAccount } from 'firebase-admin'

import { appStorage } from '../../shared/config'

const serviceAccount = {
  type: appStorage.type,
  project_id: appStorage.project_id,
  private_key_id: appStorage.private_key,
  private_key: appStorage.private_key,
  client_email: appStorage.client_email,
  client_id: appStorage.client_id,
  auth_uri: appStorage.auth_uri,
  token_uri: appStorage.token_uri,
  auth_provider_x509_cert_url: appStorage.auth_provider_x509_cert_url,
  client_x509_cert_url: appStorage.client_x509_cert_url
}

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount as ServiceAccount),
  storageBucket: appStorage.bucket
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
