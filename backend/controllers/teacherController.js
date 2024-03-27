exports.getAllTeachers = (req, res, next) => {
  res.status(200).json({ data: [] });
};
exports.getTeacherByID = (req, res, next) => {
  res.status(200).json({ data: req.params.id });
};
exports.deleteTeacherByID = (req, res, next) => {
  res.status(200).json({ data: req.params.id });
};
exports.insertTeacher = (req, res, next) => {
  res.status(200).json({ data: req.body });
};
exports.updateTeacher = (req, res, next) => {
  res.status(200).json({ data: req.body });
};
exports.getSupervisors = (req, res, next) => {
  res.status(200).json({ data: [] });
};
