const {chatDao} = require("../models/dao/index");

const addMessageController = async (req, res) => {
  const msj = await chatDao.createData(req.body);
  res.status(200).json(msj);
};

module.exports = {
  addMessageController,
};
