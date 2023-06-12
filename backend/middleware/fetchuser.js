const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
var jwt = require('jsonwebtoken');

const fetchuser = (req,res,next)=>{
    try {
        const token = req.header('auth-token');
        if(!token)
            res.status(401).send("Invalid token");
        const data = jwt.verify(token, JWT_SECRET);
        req.userdatafromjwt = data.userdata;
        next()
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal server error !");
    }
}

module.exports = fetchuser