import express from "express";
import dbFunctions from "../utils/dbFunctions"
import convertHourToMinutes from "../utils/convertHourToMinutes";
import db from "../database/connection";

const router = express.Router();

// Routes
router.get("/", async (req, res, next) => {
    const totalConnections = await db('connections').count('* as total')
    const total = totalConnections[0]
    
    return res.json(total)
});

router.post("/", async (req, res, next) => {
    const { user_id } = req.body

    await db('connections').insert({
        user_id,
    });

    return res.sendStatus(201)
});

module.exports = router;