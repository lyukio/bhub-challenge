import { firestore } from "firebase-admin"
import * as moment from "moment-timezone"

export const toMoment = (fields: any, format = false) => {
    if (!fields) return fields
    if (typeof fields === "string") return moment(fields)
    if (fields instanceof firestore.Timestamp) return moment(fields.toDate())
    for (const i in fields) {
        if (!fields[i]) continue
        if (fields[i] instanceof firestore.Timestamp) {
            fields[i] = moment(fields[i].toDate())
            if (format) fields[i] = moment(fields[i]).tz("America/Sao_Paulo").format()
            continue
        }
        if (fields[i].constructor === [].constructor || fields[i].constructor === {}.constructor) fields[i] = toMoment(fields[i], format)
    }
    return fields
}

// export const toTimestamp = (fields) => {
//     if (fields.constructor !== [].constructor && fields.constructor !== {}.constructor) {
//         if (moment.isMoment(fields)) return firestore.Timestamp.fromDate(fields.toDate())

//         if (typeof fields === "string") {
//             const date = new Date(fields)
//             if (date instanceof Date && !isNaN(date.getTime())) return firestore.Timestamp.fromDate(date)
//         }
//         return fields
//     }

//     for (const i in fields) {
//         if (moment.isMoment(fields[i])) {
//             fields[i] = firestore.Timestamp.fromDate(fields[i].toDate())
//             continue
//         }
//         if (typeof fields[i] === "string") {
//             const date = new Date(fields[i])
//             if (date instanceof Date && !isNaN(date.getTime())) {
//                 fields[i] = firestore.Timestamp.fromDate(date)
//                 continue
//             }
//         }
//         if (fields[i].constructor === [].constructor || fields[i].constructor === {}.constructor) fields[i] = toTimestamp(fields[i])
//     }
//     return fields
// }
