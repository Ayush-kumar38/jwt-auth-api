import { Router } from "express";
const authRoute = Router();
import { loginUser, registerUser } from "../controller/auth.Controller.js";

authRoute.post("/register", registerUser);
authRoute.get("/login", loginUser);
export default authRoute;
