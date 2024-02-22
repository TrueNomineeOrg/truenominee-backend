const { v4: uuidv4 } = require('uuid');

function getUuid(){
return uuidv4().replace(/-/g, "");
}
function generateUserId(){
    return "U" + getUuid();
}

function generateSessionId(){
    return "S" + getUuid();
}

function generateSessionToken(){
    return getUuid();
}

module.exports = {
    generateUserId,
    generateSessionId,
    generateSessionToken
};