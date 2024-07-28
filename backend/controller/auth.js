const { toTitleCase, validateEmail } = require("../config/function");
const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

class Auth {
  async isAdmin(req, res) {
    let { loggedInUserId } = req.body;
    try {
      let loggedInUserRole = await userModel.findById(loggedInUserId);
      res.json({ role: loggedInUserRole.userRole });
    } catch {
      res.status(404);
    }
  }

  async allUser(req, res) {
    try {
      let allUser = await userModel.find({});
      res.json({ users: allUser });
    } catch {
      res.status(404);
    }
  }

  /* User Registration/Signup controller  */
  async postSignup(req, res) {
    let { name, email, password, cPassword } = req.body;
    let error = {};
    if (!name || !email || !password || !cPassword) {
      error = {
        ...error,
        name: "Xin hãy điền thông tin!",
        email: "Xin hãy điền thông tin!",
        password: "Xin hãy điền thông tin!",
        cPassword: "Xin hãy điền thông tin!",
      };
      return res.json({ error });
    }
    if (name.length < 3 || name.length > 25) {
      error = { ...error, name: "Tên phải từ 3 đến 25 ký tự" };
      return res.json({ error });
    } else {
      if (validateEmail(email)) {
        name = toTitleCase(name);
        if ((password.length > 255) | (password.length < 8)) {
          error = {
            ...error,
            password: "Mật khẩu phải từ 8 ký tự trở lên",
            name: "",
            email: "",
          };
          return res.json({ error });
        } else {
          // If Email & Number exists in Database then:
          try {
            password = bcrypt.hashSync(password, 10);
            const data = await userModel.findOne({ email: email });
            if (data) {
              error = {
                ...error,
                password: "",
                name: "",
                email: "Email đã được dùng",
              };
              return res.json({ error });
            } else {
              let newUser = new userModel({
                name,
                email,
                password,
                userRole: 0, // 1 admin, 0 user
              });
              newUser
                .save()
                .then((data) => {
                  return res.json({
                    success: "Đăng ký tài khoản thành công!",
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        error = {
          ...error,
          password: "",
          name: "",
          email: "Email không hợp lệ",
        };
        return res.json({ error });
      }
    }
  }

  /* User Login/Signin controller  */
  async postSignin(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        error: "Xin hãy điền thông tin!",
      });
    }
    try {
      const data = await userModel.findOne({ email: email });
      if (!data) {
        return res.json({
          error: "Email hoặc mật khẩu không đúng",
        });
      } else {
        const login = await bcrypt.compare(password, data.password);
        if (login) {
          const token = jwt.sign(
            { _id: data._id, role: data.userRole },
            JWT_SECRET
          );
          const encode = jwt.verify(token, JWT_SECRET);
          return res.json({
            token: token,
            user: encode,
          });
        } else {
          return res.json({
            error: "Email hoặc mật khẩu không đúng",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const authController = new Auth();
module.exports = authController;
