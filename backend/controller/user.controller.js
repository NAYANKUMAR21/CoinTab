require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/User.model');

async function Login(req, res) {
  const { email, password } = req.body;
  try {
    const checkUser = await userModel.findOne({ email: email });

    if (!checkUser) {
      return res.status(401).send({ message: "User Doesn't Exist" });
    }
    bcrypt.compare(password, checkUser.password, async function (err, result) {
      // result == true
      if (err) {
        return res.status(404).send({ message: 'Something Went wrong !' });
      }
      if (
        result &&
        checkUser.loginAttempts <= 5 &&
        checkUser.lockUntil <= Date.now()
      ) {
        const token = jwt.sign({ id: checkUser.email }, process.env.JWT_KEY);
        await userModel.findByIdAndUpdate(
          { _id: checkUser._id },
          {
            loginAttempts: 0,
            lockUntil: 0,
          },
          {
            new: true,
          }
        );
        return res.status(200).send({
          message: 'User Logged Successfully',
          token,
          email: checkUser.email,
        });
      } else {
        if (checkUser.loginAttempts >= 4) {
          if (checkUser.lockUntil && checkUser.lockUntil >= Date.now()) {
            return res
              .status(404)
              .send({
                message:
                  'Login after 24hrs no. of Attempts exceeded more than 5',
              });
          } else if (checkUser.lockUntil && checkUser.lockUntil <= Date.now()) {
            await userModel.findByIdAndUpdate(
              { _id: checkUser._id },
              {
                $set: { loginAttempts: 1, lockUntil: 0 },
              }
            );
            return res.status(404).send({
              message: 'Wrong Password repeated Again After previous series',
              Attempt_Remaing: 4,
              Attempted: 1,
            });
          }
          let exceedADay = 24 * 60 * 60 * 1000;
          const date = Date.now() + exceedADay;
          await userModel.findByIdAndUpdate(
            { _id: checkUser._id },
            {
              $inc: { loginAttempts: 1, lockUntil: date },
            }
          );
          return res.status(404).send({
            message: 'Attemped exceeded',
            message_2: 'Wrong Password',
            Attempted: checkUser.loginAttempts + 1,
            Attempt_Remaing: Math.abs(checkUser.loginAttempts + 1 - 5),
            Lock_Until: `Login after 1minute ${date}`,
          });
        }
        await userModel.findByIdAndUpdate(
          { _id: checkUser._id },
          {
            $inc: { loginAttempts: 1 },
          }
        );
        return res.status(404).send({
          message: 'Attemped exceeded',
          Attempt_Remaing: Math.abs(checkUser.loginAttempts + 1 - 5),
          Attempted: checkUser.loginAttempts + 1,
        });
      }
    });
  } catch (er) {
    return res.status(404).send({ message: `Login Route ${er.message} ` });
  }
}

async function Signup(req, res) {
  const { email, password, name } = req.body;
  try {
    const checkUser = await userModel.findOne({ email: email });
    console.log(checkUser);
    if (checkUser) {
      return res.status(404).send({ message: 'User already existed' });
    }
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        console.log(err.message);
        return res.status(404).send({ message: 'Something Went Wrong !' });
      }
      //create User
      // Store hash in your password DB.
      await userModel.create({
        name,
        email,
        password: hash,
        loginAttempts: 0,
        lockUntil: 0,
      });
      return res.status(200).send({ message: 'Sign In Successfull' });
    });
  } catch (er) {
    return res.status(404).send({ message: ` Signin  Route ${er.message}` });
  }
}

module.exports = { Login, Signup };
