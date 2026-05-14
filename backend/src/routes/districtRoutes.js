const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/:stateId', async (req, res) => {

    const { stateId } = req.params;

    try {

        const result = await pool.query(`
            SELECT *
            FROM districts
            WHERE state_id = $1
            ORDER BY district_name ASC
        `, [stateId]);

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

module.exports = router;