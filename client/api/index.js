import { getEncodedToken } from 'authenticare/client'
// import { getUserTokenInfo, isAuthenticated, removeUser } from '../auth'
import request from 'superagent'

// this function needs to bes set after the get/etc request to allow auth
function authorizeUser () {
  return {
    Accept: 'application/json',
    Authorization: `Bearer ${getEncodedToken()}`
  }
}

export function sendRegistrationEmail (email) {
  return request
    .post('/api/v1/sendRegistrationEmail')
    .set(authorizeUser())
    .send({ email })
    .then((res) => res.body)
    .catch((err) => console.log(err.message))
}

// Do we need this?
export function sendReminderEmail (email) {
  return request
    .post('/api/v1/sendReminderEmail')
    .set(authorizeUser())
    .send({ email })
    .then((res) => res.body)
    .catch((err) => console.log(err.message))
}

// this is the same as register?
export function addNewUserInfo (info) {
  return request
    .patch('/api/v1/auth')
    .set(authorizeUser())
    .send(info)
    .then((res) => res.body)
    .catch((err) => console.log(err.message))
}

// find where this is useful - clicking on log out...
export function getUserInfo () {
  return request
  // should this be a get?
    .post('/api/v1/auth')
    .set(authorizeUser())
    .then((res) => res.body)
    .catch((err) => console.log(err.message)
      // //why is this different?
      // if (err.status === undefined) {
      //   return { id: '', username: '' }
      // }
      // throw Error('api error')
    )
}

export function updateEmail (info) {
  return request
    .patch('/api/v1/updateEmail')
    .set(authorizeUser())
    .send(info)
    .then((res) => res.body)
    .catch((err) => console.log(err.message))
}
