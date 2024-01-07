export default (asyncControllerFunction) => (req, res, next) => {
  Promise.resolve(asyncControllerFunction(req, res, next)).catch(next);
};
