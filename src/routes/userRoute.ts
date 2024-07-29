import {Router} from "express"
import { generateOtp } from "../controllers/authentication.controller";
import {
  signUp,
  logIn,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,

  logout,
  getUserProfile,
} from "../controllers/user";
// import { validatePayload } from "../middleware/validate-payload";
// import upload from "../utils/multer";
const userRouter = Router()







userRouter.post("/signup",  signUp);
userRouter.post("/login", logIn, generateOtp);
userRouter.post("/logout", logout);
userRouter.get("/", getUsers);
userRouter.get("/profile", getUserProfile);
userRouter.get("/:id", getUserById);
// userRouter.patch(
//   "/:id",
//   upload.single("photoUrl"),
//   validatePayload("user"),
//   updateUser
// );
userRouter.delete("/:id", deleteUser);













export default userRouter;
