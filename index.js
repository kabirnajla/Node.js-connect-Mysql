const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "webapp",
});

// app.get("/", (req, res) => {
//   res.send("<h1> Hello World!</h1>");
// });

app.get("/insert", (req, res) => {
  res.render("insert");
});

app.post("/insert", async (req, res) => {

    fname = req.body.fname;
    lname = req.body.lname;

    var sql = "INSERT INTO users values (null, ?, ?)";

    con.query(sql, [fname, lname], (err, result) => {
        if (err) throw err;
      console.log("1 record inserted");
      
    });

  res.redirect("/");
});

app.get("/", async (req, res) => {

  var sql = "SELECT * FROM users"
  
  con.query(sql, function (err, result) {
    if (err) throw err;
      console.log(result);

      res.render("list",{ data: result });
  })
    
});

app.get("/delete/:id", async (req, res) => {

  id = req.params.id;

  var sql = "DELETE FROM users where id = ?"
  var option = [id]

  con.query(sql,option, function(err, result) {
    if (err) throw err;
      console.log("Delete");

  })

  res.redirect("/");
});

app.get("/update/:id", async (req, res) => {

  id = req.params.id;

  var sql = "SELECT * FROM users where id = ?"
  var option = [id]

  con.query(sql,option, function(err, result) {
    if (err) throw err;
      console.log("select");

      var data = {
        "id" : result[0]['id'],
        "fname" : result[0]['fname'],
        "lname" : result[0]['lname'],
      }
      res.render("update", data)
  })
});

app.post("/update", async (req, res) => {

  id = req.body.id;
  fname = req.body.fname;
  lname = req.body.lname;
 
  var sql = "UPDATE users set fname = ?, lname = ? where id = ? ";
  var option = [fname, lname, id]

  con.query(sql, option, (err, result) => {
      if (err) {
        res.json({"status" : "error", "message" : err})
      }else {
        res.json({"status" : "ok", "message" : "UpDate data complete"})
      }
  });

  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server Started on localhost: 3000........");
});



// INSERT INTO users VALUES (NULL, "2", "2")

// SELECT * FROM users WHERE id = 1

// UPDATE users SET id = 3
// WHERE id = 5;

// DELETE FROM users WHERE fname='Ka'
