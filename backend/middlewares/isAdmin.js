import jwt from 'jsonwebtoken';

export const isAdmin = (roles) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token)
        return res.status(401).json({
          message: 'Вы не были авторизованы',
        });
      const { roles: userRoles } = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      );
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          next();
        } else {
          return res.status(403).json({
            message: 'Доступ запрещен',
          });
        }
      });
    } catch (error) {
      console.log(error)
    }
  };
};
