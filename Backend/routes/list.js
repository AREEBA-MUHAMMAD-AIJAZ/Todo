const router = require("express").Router();
// const User = require("../models/user");
const List = require("../models/list");

//create
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, email } = req.body;
    // const existingUser = await User.findById(id);
    // if (existingUser) {
    const list = new List({ title, body, email });
    await list.save().then(() => res.status(200).json({ list }));
    // existingUser.list.push(list);
    // existingUser.save();
  } catch (error) {
    console.log(error);
  }
});

//update
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body } = req.body;
    const list = await List.findByIdAndUpdate(req.params.id, { title, body });
    list.save().then(() => res.status(200).json({ message: "Task Updated" }));
  } catch (error) {
    console.log(error);
  }
});

//delete
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    // const id = req
    // console.log(id);
    await List.findByIdAndDelete(req.params.id).then(() =>
      res.status(200).json({ message: "Task Deleted" })
    );
  } catch (error) {
    console.log(error);
  }
});

//getTska
router.get("/getTasks", async (req, res) => {
  try {
    const list = await List.find();
    // console.log(list)
    if (list.length !== 0) {
      res.status(200).json({ list });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
