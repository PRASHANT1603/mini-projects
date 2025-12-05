import express from 'express';
import Todo from "../Schema/data.js";
const router = express.Router();

// Add task
router.post("/", async (req, res) => {
  try {
    console.log("BODY =", req.body);   
    const todo = new Todo({ task: req.body.task });
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Delete route
router.delete("/delete/:id", async(req, res) =>{
  try{
    await Todo.findByIdAndDelete(req.params.id);
    res.json({message : "task deleted "});
  }
 catch(error){
    res.status(500).json(error);
  }
});

// get all task
router.get("/", async (req, res) => {
  try {
    const tasks = await Todo.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update route
router.put("/update/:id", async (req, res) => {
  try {
    const updatedTask = await Todo.findByIdAndUpdate(
      req.params.id,
      { task: req.body.task },
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// is complete route
router.patch("/complete/:id", async (req, res) => {
  try {
    const task = await Todo.findById(req.params.id);
    task.isComplete = true;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




export default router;