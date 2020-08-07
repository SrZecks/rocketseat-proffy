import express from "express";

const router = express.Router()

// Routes
router.post("/", (req, res) => {
    let { users } = req.body
    console.log(users)
    return res.status(200).json(users)
});

module.exports = router;