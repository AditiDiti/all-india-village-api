const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {

    const { village } = req.query;
    if (!village || village.trim() === '') {

    return res.status(400).json({
        error: 'Village query is required'
    });
}

    try {

        const result = await pool.query(`
            SELECT
                villages.id,
                villages.village_name,
                villages.village_code,

                subdistricts.subdistrict_name,

                districts.district_name,

                states.state_name

            FROM villages

            JOIN subdistricts
            ON villages.subdistrict_id = subdistricts.id

            JOIN districts
            ON subdistricts.district_id = districts.id

            JOIN states
            ON districts.state_id = states.id

            WHERE villages.village_name ILIKE $1

            ORDER BY villages.village_name ASC

            LIMIT 50
        `, [`%${village}%`]);

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

module.exports = router;