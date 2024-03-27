exports.getAllclasses = (req, res, next) => {
  res.status(200).json({ data: [] });
};
exports.getClassByID = (req, res, next) => {
  res.status(200).json({ data: req.params.id });
};
exports.deleteClassByID = (req, res, next) => {
  res.status(200).json({ data: req.params.id });
};
exports.insertClass = (req, res, next) => {
  res.status(200).json({ data: req.body });
};
exports.updateClass = (req, res, next) => {
  res.status(200).json({ data: req.body });
};
exports.getClassChildrenInfo = (req, res, next) => {
  res.status(200).json({ data: [] });
};
exports.getClassSupervisorInfo = (req, res, next) => {
  res.status(200).json({ data: [] });
};
