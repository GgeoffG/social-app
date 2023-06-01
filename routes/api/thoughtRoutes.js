const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  postThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController.js");

//api/thoughts
router.route("/").get(getThoughts).post(postThought);

//api/thought/:thoughId

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//api/thought/thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
