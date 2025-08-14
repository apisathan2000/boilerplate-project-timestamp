// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", function (req, res) {
  const date = req.params.date;
  console.log(date);

  // let parsedUnix;

  let parsedDate;
  let unix;

  //Check if date is a number (unix timestamp)

  if (!isNaN(date)) {
    unix = parseInt(date);
    parsedDate = new Date(unix);
  } else {
    // Try to parse as date string
    parsedDate = new Date(date);
    unix = parsedDate.getTime();
  }

  // Check if date is valid
  if (isNaN(parsedDate.getTime())) {
    return res.status(500).json({ error: "Invalid Date" });
  }
  res.status(200).json({ unix: unix, utc: parsedDate.toUTCString() });

  // if (date.includes("-")) {
  //   parsedUnix = Date.parse(date);
  // } else {
  //   parsedUnix = parseInt(date);
  // }

  // const d = new Date(parsedUnix);

  // res.status(200).json({ unix: parsedUnix, utc: d.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
