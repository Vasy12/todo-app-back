module.exports = (validationSchema) => {

  return (action) => {

    return async (req, res, next) => {
      try {
        req.body = await validationSchema.validate(req.body, {
          context: {
            action,
          },
        });
        next();
      } catch (e) {
        next(e);
      }
    };
  };
};
