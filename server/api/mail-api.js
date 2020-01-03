const mailer = require('../mail/sendMail');

module.exports = (router) => {
  router.route('/sendPickMail')
    .get((req, res) => {
      const target = 'ufcsaairpick@gmail.com';
      mailer.sendPickMail(target);
      return res.send('Success')
    });

    return router;
}