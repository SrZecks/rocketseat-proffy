import db from "../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes"

interface scheduleItem {
    week_day: number,
    from: string,
    to: string
}

interface userArray {
    profile: {
        name: string,
        avatar: string,
        whatsapp: string,
        bio: string
    },
    class: {
        subject: string,
        cost: number,
        user_id: number
    },
    schedule: Array<scheduleItem>
}

const dbFunctions = {
    "insertUsers": function (user: userArray) {
        return new Promise(async (resolve, reject) => {
            const trx = await db.transaction();

            try {
                const insertedUsersId = await trx('users').insert(user.profile);
                user.class.user_id = insertedUsersId[0]
                const insertedClassId = await trx('classes').insert(user.class);
                const classSchedule = user.schedule.map((scheduleItem: scheduleItem) => {
                    return {
                        class_id: insertedClassId[0],
                        week_day: scheduleItem.week_day,
                        from: convertHourToMinutes(scheduleItem.from),
                        to: convertHourToMinutes(scheduleItem.to)
                    }
                });

                await trx('class_schedule').insert(classSchedule);
                await trx.commit()

                resolve('ok')
            } catch (err) {
                await trx.rollback()
                reject(err)
            }
        })
    }
}

export default dbFunctions;