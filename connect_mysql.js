var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "webapp"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

// var sql = "Insert Into users values (null, 'Kabir2', 'Kahapana2')";
// con.query(sql, function(err, result) {
//   if (err) throw err;
//   console.log("1 record inserted");
// });

 con.query("select * from users", function (err, result) {
    if (err) throw err;
      console.log(result);
      console.log("OK!!!!");
  })

});

