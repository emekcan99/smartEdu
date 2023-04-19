export const redirect = (req, res, next) => {
  if (req.session.userID) {
    return res.redirect("/");
  }
  next();
};
