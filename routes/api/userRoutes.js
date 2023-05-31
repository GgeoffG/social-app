const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  postUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController.js");

//api/users
router.route("/").get(getUsers).post(postUser);

//api/users/userId
router
  .route("/:userId")
  .get(getSingleUser)
  .post(postUser)
  .delete(deleteUser)
  .put(updateUser);

//api/users/userId/friends/friendsId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
