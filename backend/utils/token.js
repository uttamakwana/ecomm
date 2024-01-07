export const sendToken = (statusCode, message, res, data) => {
  const token = data.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  return res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ sucess: true, message, data, token });
};
