const { verifyToken } = require("../token");

const checkForUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  //console.log(authHeader);
  if (!authHeader) {
    return res.status(403).send({
      message: "unauthorised: user id not found",
    });
  }

  const authSplit = authHeader.split(" ");
  if (authSplit.length != 2) {
    return res.status(403).send({
      message: "unaythorised: user id is in invalid format",
    });
  }

  const token = authSplit[1];
  try {
    const jwtPayload = verifyToken({ token });
    const studentId = jwtPayload.student;
    res.locals.student = studentId;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  checkForUser,
};
