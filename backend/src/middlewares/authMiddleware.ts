// 📒📒 if you switch fully to Redis-backed sessions, your current JWT-based authenticationMiddleware becomes redundant. So I am using the codes in authSessionMiddleware.ts📒📒

import { Request, Response, NextFunction, RequestHandler } from "express";

export const authSessionMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId:string|undefined = req.session?.userId
  const userName = req.session?.userName
  // const userId = (req.session as any)?.userId as string | undefined;

  if (!userId) {
    return res.status(401).json({ msg: "Not authenticated (no session)" });
  }

  req.user = { userId,userName };

  console.log("{userId}:",userId);
  console.log("reqUser:",req.user);

  return next();
};

// 📒📒=====================This is for Jwt cookies=====================👇👇
// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";

// export interface AuthenticatedRequest extends Request {
//   user?: { userId: string; userName: string };
// }

// const authenticationMiddleware = (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {

//   console.log("checking......:",req.cookies)
//   const token = req.cookies.token;
//   if (!token) {
//     console.log("You are not authorized to access this route. ");
//     res
//       .status(401)
//       .json({ msg: "You are not authorized to access this route. " });
//     return;
//   }

//   try {

//     const decoded = jwt.verify(token, process.env.JWT_SECRET_V!) ;

//     console.log("decoded:",decoded)

//     if (!decoded || typeof decoded === "string") {
//       throw new Error("invalid token payload");
//     }

//     req.user = {
//       userId: decoded.userId,
//       userName: decoded.userName,
//     };
//     console.log("reqUser:",req.user.userId,req.user.userName)
//     next();
//   } catch (error) {
//     const message =
//       error instanceof Error
//         ? error.message
//         : "Unauthorized: Invalid or expired token";
//     res.status(401).json({msg:message})
//   }
// };

// export default authenticationMiddleware;
// 📒📒=====================This is for Jwt cookies=====================👆👆
