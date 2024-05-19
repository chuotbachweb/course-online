const RecruitmentModel = require("../models/recruitment.model");
const uploadFirebase = require("../middleware/uploadFirebase");

module.exports = {
  postRecruitment(req, res, next) {
    const recruitment = new RecruitmentModel(req.body);

    recruitment
      .save()
      .then((data) => {
        res.json({ data });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getAllRecruitment(req, res, next) {
    const { page, per_page, nameRecruitment } = req.query;
    const objWhere = {};

    if (nameRecruitment)
      objWhere.nameRecruitment = new RegExp(nameRecruitment, "i");

    RecruitmentModel.find(objWhere)
      .populate("studentApply.userId")
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

  getRecruitmentStudent(req, res, next) {
    const { page, per_page } = req.query;

    RecruitmentModel.find({ "studentApply.userId": req.user.id })
      .populate("studentApply.userId")
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

  editRecruitment(req, res, next) {
    const { id } = req.params;
    RecruitmentModel.findByIdAndUpdate(id, req.body)
      .then((recruitment) => res.json({ data: recruitment }))
      .catch((error) => res.status(500).json({ error: error }));
  },

  deleteRecruitment(req, res, next) {
    const { id } = req.params;
    RecruitmentModel.findByIdAndDelete(id)
      .then((recruitment) => res.json({ data: recruitment }))
      .catch((error) => res.status(500).json({ error: error }));
  },

  async applyRecruitment(req, res, next) {
    const checkHaveApply = await RecruitmentModel.findOne({
      _id: req.body.recruitmentId,
      "studentApply.userId": req.user.id,
    });

    if (!checkHaveApply && req.file) {
      const fileCV = await uploadFirebase({
        file: req.file,
        name: new Date().getTime() + req.file.originalname,
        type: req.file.mimetype,
      });

      RecruitmentModel.findOneAndUpdate(
        { _id: req.body.recruitmentId },
        { $push: { studentApply: { userId: req.user.id, fileCV } } },
        { new: true }
      )
        .then((apply) => res.status(200).json(apply))
        .catch((error) => console.log(error));
    }
  },

  handleApplyCV(req, res, next) {
    RecruitmentModel.findOneAndUpdate(
      {
        _id: req.body.recruitmentId,
        "studentApply.userId": req.body.userId,
      },
      {
        $set: { "studentApply.$.status": req.body.status },
      },
      { new: true }
    )
      .populate("studentApply.userId")
      .then((apply) => res.status(200).json(apply))
      .catch((error) => console.log(error));
  },
};
