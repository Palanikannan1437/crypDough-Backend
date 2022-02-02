const express = require("express");
const morgan = require("morgan");
var cors = require("cors");

const app = express();

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

const blogRouter = require("./routes/blogRoutes");
const userRouter = require("./routes/userRoutes");

app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;

// app.post("/api/v1/blogs", (req, res) => {
//   console.log(req.body);
//   sql0 = "SELECT * from Blogs where Blog_ID=?";
//   connection.query(
//     sql0,
//     [req.body.email + req.body.blogNumber],
//     function (err, results, fields) {
//       if (results.length === 0) {
//         console.log("first save", results);
//         sql =
//           "INSERT INTO Blogs (Blog_ID,Author_Email,Blog_Title,Blog_Photo,Blog_Content,blog_status) VALUES (?,?,?,?,?,?)";
//         var values = [
//           req.body.email + req.body.blogNumber,
//           req.body.email,
//           req.body.title,
//           req.body.photo,
//           req.body.post,
//           "saved",
//         ];

//         connection.query(sql, values, function (err, results, fields) {
//           if (err) {
//             console.log(err);
//           } else {
//             res.json({
//               status: "success",
//             });
//           }
//         });
//       } else {
//         sql1 =
//           "UPDATE Blogs SET Blog_Title=?, Blog_Content=?, blog_status=? WHERE Blog_ID=?";
//         var values = [
//           req.body.title,
//           req.body.post,
//           "saved",
//           req.body.email + req.body.blogNumber,
//         ];
//         connection.query(sql1, values, function (err, results, fields) {
//           console.log("safasfasdsadsaf", results);
//           if (err) {
//             console.log(err);
//           } else {
//             res.json({
//               status: "success",
//             });
//           }
//         });
//       }
//     }
//   );
// });

// app.post("/api/v1/post-blog", (req, res) => {
//   console.log(req.body);

//   sql =
//     "UPDATE Blogs SET Blog_Title=?, Blog_Content=?, blog_status=? WHERE Blog_ID=?";

//   var values = [
//     req.body.title,
//     req.body.post,
//     "posted",
//     req.body.email + req.body.blogNumber,
//   ];

//   connection.query(sql, values, function (err, results, fields) {
//     console.log(results, "results");
//     if (err) {
//       console.log(err);
//     }
//     res.status(200).json({
//       status: "success",
//     });
//   });
// });

//turn to a get request
// app.post("/api/v1/blogs/:userid?count="yes", (req, res) => {
//   sql = `SELECT COUNT(*) from Blogs where Author_Email=?`;
//   var values = [req.body.email];
//   connection.query(sql, values, function (err, results, fields) {
//     console.log(results);
//     if (err) {
//       console.log(err);
//     }
//     res.status(200).json({
//       status: "success",
//       data: {
//         count: results[0]["COUNT(*)"],
//       },
//     });
//   });
// });

// app.get("/api/v1/blogs/:userid", (req, res) => {
//   sql = `SELECT Blog_Title,Blog_ID,Blog_Date,blog_status from Blogs where Author_Email=?`;
//   var values = [req.body.email];
//   connection.query(sql, values, function (err, results, fields) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.status(200).json({
//         status: "Success",
//         data: {
//           data: results,
//         },
//       });
//     }
//   });
// });

// app.get("/api/v1/blogs", (req, res) => {
//   let sql = `SELECT * FROM Blogs where blog_status="posted"`;
//   connection.query(sql, function (err, results, fields) {
//     res.status(200).json({
//       status: "success",
//       data: {
//         data: results,
//       },
//     });
//   });
// });
