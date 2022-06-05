const expressJwt = require('express-jwt');
function authJwt() {
    const secret = 'hfdjfjf';
    
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        
    }).unless({
        path: [
           
           { url: /(.*)/}
        ]
    })
}





module.exports = authJwt