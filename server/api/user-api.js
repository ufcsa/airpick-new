const express = require('express');
const User = require('../model/user.model');
const bcrypt = require('bcrypt-nodejs');
//const _filter = { 'pwd': 0, '__v': 0 };

module.exports = function (router) {
  router.post('/login', (req, res) => {
    const { input, pwd } = req.body;
    User.findOne({ '$or': [{ username: input }, { email: input }] })
      .exec((err, doc) => {
        if (err) console.log(err)
        if (!doc) {
          res.send({
            code: 1,
            msg: 'cannot authenticate this user'
          })
        } else if (!doc.comparePassword(pwd)) {
          res.send({
            code: 1,
            msg: 'username / password error'
          })
        } else {
          console.log(doc)
          res.cookie('userid', doc._id)
          res.json({
            code: 0,
            msg: 'login success!',
            data: doc
          })
        }
      })
  });

  /**
   * todo: finish register
   */
  router.post('/register', (req, res) => {
    let user = new User();
    
  })


  return router;
}