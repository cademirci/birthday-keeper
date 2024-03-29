const express = require('express')
const router = express.Router()
const Person = require('../models/person')
const sequelize = require('sequelize')

router.get('/', async (req, res, next) => {
  let people = [], birthdayToday = [], birthdayThisMonth = []

  // find everyone
  await Person.findAll({})
    .then(result => people = result)
    .catch(next)
  
  // find birthdates in current month
  let currentMonth = new Date().getMonth() + 1
  if (currentMonth < 10) {
    currentMonth = '-0' + currentMonth + '-'
  }
  else {
    currentMonth = '-' + currentMonth + '-'
  }
  await Person.findAll({
    where: { birthdate: { [sequelize.Op.substring]: currentMonth }}
  })
    .then(result => birthdayThisMonth = result)
    .catch(err => console.log(err))

  // find birthdays today
  let currentDay = new Date().getDate()
  await Person.findAll({
    where: { 
      [sequelize.Op.and]: [
        { birthdate: { [sequelize.Op.substring]: currentMonth }},
        { birthdate: { [sequelize.Op.substring]: currentDay }}
      ]
     }
  })
    .then(result => birthdayToday = result)
    .catch(err => console.log(err))

  res.render('index', {
    name: 'Birthday Keeper via NodeJS and Sequelize', 
    peopleArray: people, 
    thisMonthArray: birthdayThisMonth,
    birthdayArray: birthdayToday
  })
})

router.post('/', async (req, res) => {
  console.log(req.body)
  return await Person.create({
    name: req.body.name, 
    birthdate: req.body.birthdate
  }).then(() => {
    res.redirect('/')
  }).catch(err => console.log(err))
})

router.post('/delete-person', async (req, res, next) => {
  let personId = req.body.del.substring(req.body.del.indexOf(':') + 2)
  return await Person.destroy({
    where: {id: personId }
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router