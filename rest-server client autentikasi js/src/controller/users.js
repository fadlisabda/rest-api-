const UsersModel = require("../models/users");
const getAllUsers = async (req, res) => {
  try {
    const [data] = await UsersModel.getAllUsers();
    res.json({
      pesan: "get all users berhasil",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      pesan: "server error",
      serverMessage: error,
    });
  }
};

const createNewUser = async (req, res) => {
  const { body } = req;
  try {
    await UsersModel.createNewUser(body);
    res.json({
      pesan: "tambah user baru berhasil",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      pesan: "server error",
      serverMessage: error,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await UsersModel.updateUser(body, id);
    res.json({
      pesan: "update user berhasil",
      data: {
        id: id,
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      pesan: "server error",
      serverMessage: error,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await UsersModel.deleteUser(id);
    res.json({
      pesan: "hapus user berhasil",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      pesan: "server error",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
