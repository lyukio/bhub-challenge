import * as admin from "firebase-admin"
import * as serviceAccount from "./config/serviceAccount.json"

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key,
    }),
})
export const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })
export const auth = admin.auth()
