const router = require("express").Router();

router.get("/api/users", (req, res) => {
  res.send("hello to users");
});

module.exports = router;
