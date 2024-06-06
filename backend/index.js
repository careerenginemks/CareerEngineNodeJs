
global.foodData = require('./db')(function call(err, data, CatData) {
  // console.log(data)
  if(err) console.log(err);
  global.foodData = data;
  global.foodCategory = CatData;
})

const express = require('express')
const app = express()
const port = 5000
var path = require('path');
const cors = require('cors'); // Import cors middleware
const { job } = require('./cron');

app.use(cors()); // Use cors middleware to handle CORS requests

// Start the cron job
job.start();

app.use((req, res, next) => {

  const corsWhitelist = [
    "http://localhost:3000",
    "https://gnj.vercel.app",
];
if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin, X-Requested-With, Accept");
}
  next();
});
// set path for static assets
app.use(express.static(path.join(__dirname, 'uploads')));


app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./Routes/Auth'));

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})

