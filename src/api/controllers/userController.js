const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

exports.createUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });

  await user.save();
  res.send(user);
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true });

  if (!user) {
    return res.status(404).send('El usuario no existe.');
  }

  res.send(user);
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(404).send('El usuario no existe.');
  }

  res.status(204).send();
};
