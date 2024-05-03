const LessonModel = require("../models/lesson.model");
const CourseModel = require("../models/course.model");
const uploadFirebase = require("../middleware/uploadFirebase");

async function deleteLesson(id) {
  try {
    const lessonId = id;

    const deletedLesson = await LessonModel.findByIdAndDelete(lessonId);

    if (!deletedLesson) {
      return 404;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getCourseId(req, res, next) {
    LessonModel.find({ courseId: req.params.id })
      .then((data) => {
        res.status(200).json({
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },

  getLessonById(req,res, next) {
    LessonModel.findById(req.params.id)
    .then((data) => {
      res.status(200).json({
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
  },

  async addLesson(req, res, next) {
    try {
      if (req.file) {
        const videoUrl = await uploadFirebase({
          file: req.file,
          name: new Date().getTime() + req.file.originalname,
          type: req.file.mimetype,
        });
        req.body.videoUrl = videoUrl;
      }

      req.body.courseId = req.params.id;

      const lesson = new LessonModel(req.body);
      const savedLesson = await lesson.save();

      const updatedCourse = await CourseModel.findOneAndUpdate(
        { _id: req.body.courseId },
        { $push: { lesson: savedLesson._id } },
        { new: true }
      );

      res.json({ data: updatedCourse });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async deleteLesson(req, res, next) {
    try {
      deleteLesson(req.params.id);

      await CourseModel.updateMany(
        { lesson: req.params.id },
        { $pull: { lesson: req.params.id } }
      );

      res.json({ message: "Xóa bài học thành công" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async editLesson(req, res, next) {
    if (req.file) {
      const videoUrl = await uploadFirebase({
        file: req.file,
        name: new Date().getTime() + req.file.originalname,
        type: req.file.mimetype,
      });
      req.body.videoUrl = videoUrl;
    }
    console.log(req.body.videoUrl);
    LessonModel.findOneAndUpdate({ _id: req.params.id }, req.body).then(
      (data) => {
        res.json({ data: data });
      }
    );
  },
};
