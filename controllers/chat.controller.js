const {chatDao} = require("../models/dao/index");

const addMessageController = async (req, res, next) => {
  try {
    const msj = await chatDao.createData(req.body);
    res.status(200).json(msj);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addMessageController,
};
