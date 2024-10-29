import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  try {
    const { username, fechanac, identificacion, email, celular, password, perfil } = req.body;

    //Verificaciones de las variables del formulario
    const useridentificacionFound = await User.findOne({ identificacion });
    if (useridentificacionFound)
      return res.status(400).json({
        message: ["Este número de identificación ya se encuentra en uso!"],
      });

    const userFound = await User.findOne({ email });
    if (userFound)
      return res.status(400).json({
        message: ["Este correo ya se encuentra en uso!"],
      });

    const usercelularFound = await User.findOne({ celular });
    if (usercelularFound)
      return res.status(400).json({
        message: ["Este número de celular ya se encuentra en uso!"],
       });

    // hashing the password
    const passwordHash = await bcrypt.hash(password, 10);

    // creating the user
    const newUser = new User({
      username,
      fechanac,
      identificacion,
      email,
      celular,
      password: passwordHash,
      perfil,
    });

    // saving the user in the database
    const userSaved = await newUser.save();

    // create access token
    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      fechanac: userSaved.fechanac,
      identificacion: userSaved.identificacion,
      email: userSaved.email,
      celular: userSaved.celular,
      perfil: userSaved.perfil,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registeradmin = async (req, res) => {
  try {
    const { username, fechanac, identificacion, email, celular, password, perfil } = req.body;

    //Verificaciones de las variables del formulario
    const useridentificacionFound = await User.findOne({ identificacion });
    if (useridentificacionFound)
      return res.status(400).json({
        message: ["Este número de identificación ya se encuentra en uso!"],
      });

    const userFound = await User.findOne({ email });
    if (userFound)
      return res.status(400).json({
        message: ["Este correo ya se encuentra en uso!"],
      });

    const usercelularFound = await User.findOne({ celular });
    if (usercelularFound)
      return res.status(400).json({
        message: ["Este número de celular ya se encuentra en uso!"],
       });

    // hashing the password
    const passwordHash = await bcrypt.hash(password, 10);

    // creating the user
    const newUser = new User({
      username,
      fechanac,
      identificacion,
      email,
      celular,
      password: passwordHash,
      perfil,
    });

    // saving the user in the database
    const userSaved = await newUser.save();

    // create access token
    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      fechanac: userSaved.fechanac,
      identificacion: userSaved.identificacion,
      email: userSaved.email,
      celular: userSaved.celular,
      perfil: userSaved.perfil,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: ["El usuario ingresado no existe!"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["La contraseña es incorrecta!"],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      perfil: userFound.perfil,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      perfil: userFound.perfil,
    });
  });
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
