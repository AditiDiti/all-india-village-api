const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/:districtId', async (req, res) => {

    const { districtId } = req.params;

    try {

        const result = await pool.query(`
            SELECT *
            FROM subdistricts
            WHERE district_id = $1
            ORDER BY subdistrict_name ASC
        `, [districtId]);

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

module.exports = router;