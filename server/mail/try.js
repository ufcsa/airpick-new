const sendRequest = require('./sendAddRequestMail');
const sendPick = require('./sendPickMail');

const target = 'ufcsaairpick@gmail.com';


sendPick(target);
sendRequest(target);