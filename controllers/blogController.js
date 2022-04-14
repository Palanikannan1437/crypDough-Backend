const connection = require("../database/connection");

function TrimName(name) {
  if (name.length > 100) {
    let name1 = name.slice(0, 100);
    while (name1.charAt(name1.length - 1) !== " " && name1.length !== 0) {
      name1 = name1.slice(0, -1);
    }
    return name1;
  } else {
    return name;
  }
}
// / url
exports.getPostedBlogs = (req, res) => {
  let sql = `SELECT * FROM Blogs where blog_status="posted"`;
  connection.query(sql, function (err, results, fields) {
    const finalResults = results.map((post) => {
      post.Blog_Content = TrimName(post.Blog_Content);
      return post;
    });
    res.status(200).json({
      status: "success",
      data: {
        data: finalResults,
      },
    });
  });
};

exports.getBlog = (req, res) => {
  let sql = "SELECT * from Blogs where Blog_ID=?";
  connection.query(sql, [req.params.blogid], (err, results, fields) => {
    console.log(results);
    res.status(200).json({
      status: "success",
      data: results[0],
    });
  });
};

exports.getUserBlogTitles = (req, res) => {
  let sql = `SELECT Blog_Title,Blog_ID from Blogs where Author_Email=?`;
  //Author_Email undefined? Where did you come from where did you go, where did you come from aotton eyed Joe????
  var values=[req.params.email];
  connection.query(sql, values, (err, results, fields) => {
    console.log(results);
    res.status(200).json({
      status: "success",
      data: {
        data: results,
        //Do data.data.data teapot head, array bhej rahi hai
      },
    });
  });
};

exports.saveBlog = (req, res) => {
  let sql0 = "SELECT * from Blogs where Blog_ID=?";
  connection.query(
    sql0,
    [req.body.email + req.body.blogNumber],
    function (err, results, fields) {
      console.log("first save");
      console.log(results);
      if (results.length === 0) {
        let sql =
          "INSERT INTO Blogs (Blog_ID,Author_Email,Blog_Title,Blog_Photo,Blog_Content,blog_status) VALUES (?,?,?,?,?,?)";
        var values = [
          req.body.email + req.body.blogNumber,
          req.body.email,
          req.body.title,
          req.body.photo,
          req.body.post,
          "saved",
        ];

        connection.query(sql, values, function (err, results, fields) {
          if (err) {
            console.log(err);
          } else {
            res.json({
              status: "success",
            });
          }
        });
      } else {
        console.log("second save");
        let sql1 =
          "UPDATE Blogs SET Blog_Title=?, Blog_Content=?, blog_status=? WHERE Blog_ID=?";
        var values = [
          req.body.title,
          req.body.post,
          "saved",
          req.body.email + req.body.blogNumber,
        ];
        connection.query(sql1, values, function (err, results, fields) {
          if (err) {
            console.log(err);
          } else {
            res.json({
              status: "success",
            });
          }
        });
      }
    }
  );
};

exports.postBlog = (req, res) => {
  let sql =
    "UPDATE Blogs SET Blog_Title=?, Blog_Content=?, blog_status=? WHERE Blog_ID=?";

  var values = [
    req.body.title,
    req.body.post,
    "posted",
    req.body.email + req.body.blogNumber,
  ];

  connection.query(sql, values, function (err, results, fields) {
    if (err) {
      console.log(err);
      return;
    }
    res.status(200).json({
      status: "success",
    });
  });
};

// /:userid url
exports.getUserBlogs = (req, res) => {
  let sql;
  if (req.query.count === "yes") {
    sql = `SELECT COUNT(*) from Blogs where Author_Email=?`;
  } else {
    sql = `SELECT Blog_Title,Blog_ID,Blog_Date,blog_status from Blogs where Author_Email=?`;
  }
  var values = [req.params.userid];
  connection.query(sql, values, function (err, results, fields) {
    if (err) {
      console.log(err);
      return;
    }
    if (req.query.count === "yes") {
      res.status(200).json({
        status: "success",
        data: {
          count: results[0]["COUNT(*)"],
        },
      });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          data: results,
        },
      });
    }
  });
};
