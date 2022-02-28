const jwt = require("jsonwebtoken");
const connection = require("../database/connection");
const bcrypt = require("bcrypt");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const correctPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

exports.signUp = async (req, res) => {
  const User_Password_Encrypted = await bcrypt.hash(req.body.User_Password, 12);
  let sql =
    "INSERT INTO User (User_Email,UserName,User_Password,id) VALUES (?,?,?,UUID_TO_BIN(UUID()))";
  let values = [
    req.body.User_Email,
    req.body.UserName,
    User_Password_Encrypted,
  ];

  connection.query(sql, values, function (err, results, fields) {
    if (err) {
      res.json({
        status: "Enter valid details,sign up failed!",
      });
    } else {
      let sql1 =
        "SELECT User_Email,UserName,BIN_TO_UUID(id) FROM User WHERE User_Email=?";
      let values = [req.body.User_Email];
      connection.query(sql1, values, function (err, results, fields) {
        const token = signToken(results[0]["BIN_TO_UUID(id)"]);

        res.status(201).json({
          status: "success",
          token: token,
          data: { user_data: results },
        });
      });
    }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: "Password or email is missing!",
    });
  }

  const sql =
    "SELECT User_Email,User_Password,BIN_TO_UUID(id) FROM User WHERE User_Email=?";
  const values = [req.body.email];
  connection.query(sql, values, async (err, results, fields) => {
    console.log(results);
    if (
      !results[0] ||
      !(await correctPassword(password, results[0]["User_Password"]))
    ) {
      return res.status(401).json({
        status: "Incorrect Email or Password!",
      });
    }

    const token = signToken(results[0]["BIN_TO_UUID(id)"]);
    res.status(200).json({
      status: "success",
      token: token,
    });
  });
};

exports.protect = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      status: "Please login or signup to access this resource!",
    });
  }
};
