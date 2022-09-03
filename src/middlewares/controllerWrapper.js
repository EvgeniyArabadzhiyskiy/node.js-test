const controllerWrapper = (ctrl) => {
  return (req, res, next) => {
    ctrl(req, res, next).catch((err) => {
      next(err)
    });
  };
};

module.exports = controllerWrapper;
