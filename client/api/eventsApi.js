import { getEncodedToken } from 'authenticare/client'
import request from 'superagent'
const acceptJsonHeader = { Accept: 'application/json' }

/**
 * Post new event to projects table
 * @param {string} id - User Id
 * @param {object} event - Form field inputs from CreateProject
 * @param {string} event.name - The name of the event
 * @param {string} event.description - A description of the event
 * @param {string} event.startDate - The date the event starts
 * @param {string} event.endDate - The date the event ends
 * @param {string} event.topic - The general topic of the event
 *
 * @returns {Promise.<number[]>} array[0] eventId
 */
export function addNewEvent (id, event) {
  return request
    .post('/api/v1/events/' + id)
    .set(acceptJsonHeader)
    .set({ Authorization: `Bearer ${getEncodedToken()}` })
    .send(event)
    .then((res) => res.body)
    .catch((error) => console.log(error))
}

/**
 * @typedef {object} Event
 * @property {number} id
 */
/**
 * Request array of events from projects table
 * @returns {Promise.<Event[]>}
 */
export function showAllEvents () {
  return request
    .get('/api/v1/events')
    .set(acceptJsonHeader)
    .then((res) => res.body)
    .catch((error) => console.log(error))
}

/**
 * Add userID and EventId to users_projects table
 * @param {string} id - User Id
 * @param {string} eventId - eventId
 *
 * @returns {Promise.<number[]>} array[0] team id
 */
export function joinEvent (id, eventId) {
  return request
    .post('/api/v1/events/attending')
    .set(acceptJsonHeader)
    .send(id, eventId)
    .then((res) => res.body)
    .catch((error) => console.log(error))
}
/**
 * Get a list of all events user has joined
 * @param {string} id - User Id
 *
 * @returns {Promise.<number[]>} A list of event ids
 */
export function showAllUserEventIds (id) {
  return request
    .get(`/api/v1/events/${id}/attending`)
    .set(acceptJsonHeader)
    .then((res) => res.body)
    .catch((error) => console.error(error))
}
