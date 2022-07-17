// Register
{/**
Create a form for user to input emal and password
we get user input in the state
send info in the backend and save data in backend and server
this is how first step is done in register user
followed by login and many more features later
fair amount of work in backend at first
Which means only one thing a lot of *******************************errors*************************
So let be prepared
but once complete login and register
everything will be much easier
*/}


// mongo db
//before we save anything in database, we define a schema
//schema will tell you what are the field that u can store in database
//with schema we can create and example of user model
//which will allow us to query the database to find that user, update, or delete
//technically mongodb is schemaless but using mongoose requies us to create
//allows easy interaction in databaseimport User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";

export const register = async (req, res) => {
  //  console.log("REGISTER ENDPOINT => ", req.body);
  const { name, email, password, secret } = req.body;
  // validation
  if (!name) return res.status(400).send("Name is required");
  if (!password || password.length < 6)
    return res
      .status(400)
      .send("Password is required and should be 6 characters long");
  if (!secret) return res.status(400).send("Answer is required");
  const exist = await User.findOne({ email });
  if (exist) return res.status(400).send("Email is taken");
  // hash password
  const hashedPassword = await hashPassword(password);

  const user = new User({ name, email, password: hashedPassword, secret });
  try {
    await user.save();
    // console.log("REGISTERED USE => ", user);
    return res.json({
      ok: true,
    });
  } catch (err) {
    console.log("REGISTER FAILED => ", err);
    return res.status(400).send("Error. Try again.");
  }
};