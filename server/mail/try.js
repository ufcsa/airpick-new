const sendRequest = require('./sendMail');
const sendPick = require('./sendPickMail');

const target = 'ufcsaairpick@gmail.com';


sendPick(target);
sendRequest(target);