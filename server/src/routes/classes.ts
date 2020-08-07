import express from "express";
import dbFunctions from "../utils/dbFunctions"
import convertHourToMinutes from "../utils/convertHourToMinutes";
import db from "../database/connection";

const router = express.Router();

// Routes
router.get("/", async (req, res, next) => {
    const filters = req.query

    const week_day = filters.week_day as string;
    const subject = filters.subject as string;
    const time = filters.time as string;

    if (!week_day || !subject || !time) {
        return res.status(400).json({
            error: "Missing filters to search class"
        })
    }

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await db('classes')
        .whereExists(function () {
            this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
        })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*']);

    return res.json(classes);
});

router.post("/", async (req, res, next) => {
    let { user } = req.body
    console.log(user)
    dbFunctions.insertUsers(user)
        .then(result => {
            return res.sendStatus(201);
        })
        .catch(err => {
            return next(err)
        })
});

module.exports = router;