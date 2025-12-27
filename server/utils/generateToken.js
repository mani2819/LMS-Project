import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // Should be true in production deepseek 
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      // domain: "localhost" // 👈 Add this line for local development
    }).json({
        success:true,
        message,
        user
    });
};

