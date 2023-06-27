const conn = require("./db");
const exp = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
conn();
const app = exp() 
var corOptions={
  origin:true,
  credentials: true
}
app.use(cors(corOptions));
// app.use(cors);
app.use(exp.json());
// app.use((req,res,next)=>{
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-Width, Content-Type, Accept"
//   );
//   next();
// });
app.use('/auth', require('./routes/auth'));
app.use('/contact', require('./routes/contact'));

app.get("/", (req, res) => {
  res.send('he he he he....sab changa si !!');
});
app.listen(process.env.REACT_APP_PORT, () => {
  console.log("ho giya hai connection sahi se !!");
});
