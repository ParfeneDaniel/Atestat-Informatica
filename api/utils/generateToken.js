import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateTokenAndSetCookie = (id, res) => {
    const token = jwt.sign({ id }, JWT_SECRET, {
        "expiresIn": "1d",
        //expiresIn: "30s",
    });
    res.cookie("jwt", token, {
       maxAge: 1 * 24 * 60 * 60 * 1000,
       //maxAge: 30 * 1000,
       httpOnly: true,
       sameSite: "strict",
       secure: true,
    });
}