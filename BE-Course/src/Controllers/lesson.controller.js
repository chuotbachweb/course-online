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

  getAllLesson(req, res, next) {
    const { page, per_page, nameLesson, teacherId } = req.query;
    const objWhere = {};

    if (nameLesson) objWhere.nameLesson = new RegExp(nameLesson, "i");
    if (teacherId) objWhere.teacherId = teacherId;

    LessonModel.find(objWhere)
      .populate("assignments.userId")
      .sort({ _id: -1 })
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

  getLessonById(req, res, next) {
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
      if (req.files) {
        const fileUrl = await uploadFirebase({
          file: req.files.fileHomework[0],
          name: new Date().getTime() + req.files.fileHomework[0].originalname,
          type: req.files.fileHomework[0].mimetype,
        });
        const videoUrl = await uploadFirebase({
          file: req.files.videoUrl[0],
          name: new Date().getTime() + req.files.videoUrl[0].originalname,
          type: req.files.videoUrl[0].mimetype,
        });
        req.body.fileHomework = fileUrl;
        req.body.videoUrl = videoUrl;
      }

      req.body.courseId = req.params.id;
      req.body.teacherId = req.user.id;

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
    if (req.files.fileHomework) {
      const fileUrl = await uploadFirebase({
        file: req.files.fileHomework[0],
        name: new Date().getTime() + req.files.fileHomework[0].originalname,
        type: req.files.fileHomework[0].mimetype,
      });
      req.body.fileHomework = fileUrl;
    }
    if (req.files.videoUrl) {
      const videoUrl = await uploadFirebase({
        file: req.files.videoUrl[0],
        name: new Date().getTime() + req.files.videoUrl[0].originalname,
        type: req.files.videoUrl[0].mimetype,
      });
      req.body.videoUrl = videoUrl;
    }
    LessonModel.findOneAndUpdate({ _id: req.params.id }, req.body).then(
      (data) => {
        res.json({ data: data });
      }
    );
  },

  async submitAssignment(req, res, next) {
    if (req.file) {
      const fileAssignment = await uploadFirebase({
        file: req.file,
        name: new Date().getTime() + req.file.originalname,
        type: req.file.mimetype,
      });
      req.body.fileAssignment = fileAssignment;
    }

    LessonModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          assignments: {
            userId: req.user.id,
            fileAssignment: req.body.fileAssignment,
          },
        },
      },
      { new: true }
    ).then((data) => {
      res.json({ data: data });
    });
  },

  changeAssignment(req, res, next) {
    LessonModel.findOneAndUpdate(
      {
        _id: req.params.id,
        "assignments._id": req.body.assignmentsId,
      },
      {
        $set: { "assignments.$.scores": req.body.scores },
      },
      { new: true }
    )
      .populate("assignments.userId")
      .then((apply) => res.status(200).json(apply))
      .catch((error) => console.log(error));
  },
};
