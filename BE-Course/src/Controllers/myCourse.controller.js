const MyCourseModel = require("../models/myCourse.model");
const CourseModel = require("../models/course.model");
const LessonModel = require("../models/lesson.model");

module.exports = {
  async buyCourse(req, res, next) {
    req.body.studentId = req.user.id;
    req.body.courseId = req.params.id;
    const course = await CourseModel.findById(req.params.id);
    req.body.teacherId = course.teacherId._id;
    const checkCourse = await MyCourseModel.findOne({
      studentId: req.body.studentId,
      courseId: req.body.courseId,
    });
    req.body.nameCourse = course.nameCourse;

    if (!checkCourse) {
      const myCourse = new MyCourseModel(req.body);
      myCourse
        .save()
        .then((data) => {
          res.status(200).json({ data });
        })
        .catch((error) => res.sendStatus(500));
    }
  },

  getMyCourse(req, res, next) {
    const { page, per_page } = req.query;
    MyCourseModel.find({ studentId: req.user.id })
      .sort({ _id: -1 })
      .populate(["courseId", "studentId", "teacherId"])
      .then((data) => {
        const currentPage = parseInt(page) || 1;
        const itemsPerPage = parseInt(per_page) || data.length;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage) || data.length;

        const items = data.slice(startIndex, endIndex);

        res.json({
          data: items,
          currentPage,
          totalPages,
        });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  },

  getCourseById(req, res, next) {
    CourseModel.findById(req.params.id)
      .populate("teacherId")
      .then((course) => {
        res.json({ data: course });
      })
      .catch((error) => {
        res.sendStatus(500);
      });
  },

  async trackProgress(req, res, next) {
    try {
      const { lessonId, courseId } = req.body;

      const lesson = await LessonModel.findById(req.body.lessonId);
      const myCourse = await MyCourseModel.find({
        courseId: lesson.courseId._id,
        studentId: req.user.id,
      }).populate(["courseId", "studentId", "teacherId"]);

      const courseIdInProgress = myCourse.map((course) => {
        const isInProgress = course.progress.includes(lessonId);
        return isInProgress;
      });

      if (!courseIdInProgress[0]) {
        const updateProgress = await MyCourseModel.findOneAndUpdate(
          { courseId: courseId, studentId: req.user.id },
          { $push: { progress: lessonId } },
          { new: true }
        );

        res.json({ data: updateProgress });
      } else {
        res.json({ message: "Bài giảng đã học" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  deleteMyCourse(req, res, next) {
    MyCourseModel.findByIdAndDelete(req.params.id)
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  },
};
