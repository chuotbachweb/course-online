module.exports = {
  async deleteModel(model, courseId) {
    try {
      const res = await model.findOneAndDelete({
        _id: courseId,
      });
      return res;
    } catch (error) {
      return error;
    }
  },

  async getById(model,id){
    try {
      const res = await model.findById(id);
      return res;
    } catch (error) {
      return error;
    }
  },
};
