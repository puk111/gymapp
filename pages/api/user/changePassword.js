import { getSession } from "next-auth/react";
import { comparePassword, hashPassword } from "../../../helpers/db/crypt";
import { connectToDb } from "../../../helpers/db/dbcon";
// import { authOptions } from "pages/api/auth/[...nextauth]";
// import { unstable_getServerSession } from "next-auth/next";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  // const session = await unstable_getServerSession(req, res, authOptions);
  const session = await getSession({ req: req });
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDb();
  const usersCollection = client.db().collection("users");

  const existUser = await usersCollection.findOne({ email: userEmail });

  if (!existUser) {
    res.status(404).json({ ErrMessage: "user dont exist" });
    client.close();
    return;
  }

  const currentPassword = existUser.password;

  const oldPasswordMatch = await comparePassword(oldPassword, currentPassword);

  if (!oldPasswordMatch) {
    res.status(403).json({ ErrMessage: "wrong password" });
    client.close();
    return;
  }

  const hashNewPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashNewPassword } }
  );

  client.close();
  res.status(200).json({ message: "password updated" });
}

export default handler;
