import * as admin from "firebase-admin"
// import { seedDB } from "./dbseed"

admin.initializeApp()
export const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })
export const auth = admin.auth()

// seedDB(db)
