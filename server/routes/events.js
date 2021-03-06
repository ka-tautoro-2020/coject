const express = require('express')
const router = express.Router()
const { getTokenDecoder } = require('authenticare/server')

const {
  saveNewEvent,
  getAllEvents,
  deleteEvent,
  addUserToEvent,
  getEventsForUser
} = require('../Db/projectDb')

router.get('/', (req, res) => {
  getAllEvents()
    .then((events) => {
      res.status(200).json(events)
    })
    .catch((err) => {
      res.status(500).send(`DATABASE ERROR ${err.message}`)
    })
})

router.post('/:id/attending', getTokenDecoder(), (req, res) => {
  if (req.user) {
    const id = Number(req.params.id)
    const { eventId } = req.body

    addUserToEvent(id, eventId)
      .then((ids) => {
        res.status(200).json(ids[0])
      })
      .catch((err) => {
        res.status(500).send(`DATABASE ERROR ${err.message}`)
      })
  } else {
    res.status(401).send('authentication token not provided')
  }
})

router.get('/:id/attending', getTokenDecoder(), (req, res) => {
  if (req.user) {
    const { id } = req.params
    getEventsForUser(Number(id))
      .then((events) => {
        res.status(200).json(events)
      })
      .catch((err) => {
        res.status(500).send(`DATABASE ERROR ${err.message}`)
      })
  } else {
    res.status(401).send('authentication token not provided')
  }
})
router.post('/:id', getTokenDecoder(), (req, res) => {
  if (req.user) {
    const id = Number(req.params.id)
    saveNewEvent(id, req.body)
      .then((ids) => {
        return res.status(200).json(ids[0])
      })
      .catch((err) => {
        res.status(500).send(`DATABASE ERROR ${err.message}`)
      })
  } else {
    res.status(401).send('authentication token not provided')
  }
})

router.delete('/', getTokenDecoder(), (req, res) => {
  if (req.user) {
    const id = Number(req.body)
    deleteEvent(id)
      .then(() => {
        res.sendStatus(200)
        return null
      })
      .catch((err) => {
        res.status(500).send(`DATABASE ERROR ${err.message}`)
      })
  } else {
    res.status(401).send('authentication token not provided')
  }
})

module.exports = router
