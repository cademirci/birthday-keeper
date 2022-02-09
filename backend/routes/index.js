const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', {
    name: 'junior developer assignment'
  })
})

module.exports = router