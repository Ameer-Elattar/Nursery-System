exports.getAllChildren = (req, res, next) => {
  res.status(200).json({ data: [] });
};
exports.getChildByID = (req, res, next) => {
  res.status(200).json({ data: req.params.id });
};
exports.deleteChildByID = (req, res, next) => {
  res.status(200).json({ data: req.params.id });
};
exports.insertChild = (req, res, next) => {
  res.status(200).json({ data: req.body });
};
exports.updateChild = (req, res, next) => {
  res.status(200).json({ data: req.body });
};
