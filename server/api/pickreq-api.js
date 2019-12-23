'use strict';
const User = require('../model/user.model');
const Pickreq = require('../model/pickreq.model');


module.exports = router => {
  //middleware to search requester info
  router.param('username', (req, res, next, username) => {
    req.username = username;
    console.log('middleware get username:', req.username)
    /**
     * todo: if the user is updating,
     * then directly return next();
     */

    Pickreq.findOne({ username: username })
      .exec((err, doc) => {
        if(err) {
          return next(err);
        } else if(!doc) {
          req.currRequest = null;
          return next();
        } else {
          req.currRequest = doc;
          let volunteer = req.currRequest.volunteer;
          if(volunteer && volunteer.length) {
            User.findOne({ username: volunteer })
              .exec((err, volunteerInfo) => {
                if(err) {
                  req.currRequest = null;
                  return next(err);
                } else if(volunteerInfo) {
                  const {pwd, ...info} = volunteerInfo;
                  req.volunteer = info;
                  return next();
                }
              });
          } else {
            return next();
          }
        }
      });
  });


  router.route('/:username') 
    .get((req, res) => {
      console.log('getting current user info', req.currRequest)
      return res.json({
        code: 0,
        data: {
          request: req.currRequest,
          volunteer: req.volunteer
        }
      });
    })
    .put((req, res) => {
      if(req.body) {
        console.log(req.body)
        //if the user unpublished the request, then remove the volunteer
        if(!req.body.published) {
          req.body.volunteer = '';
        }
        Pickreq.findOneAndUpdate({username: req.username}, req.body,
          { upsert: true, setDefaultsOnInsert: true, new: true }, (err, doc) => {
            if(err) {
              console.log(err.stack);
              return res.status(422).json({
                code: 1,
                msg: 'Failed to update/create request info'
              });
            } else {
              console.log('successfully update');
              return res.status(200).json({
                code: 0,
                msg: 'Successfully update!',
                data: {
                  request: doc
                }
              })
            }
          });
      }
    });
  return router;
}