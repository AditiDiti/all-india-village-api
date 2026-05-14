const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/:subdistrictId', async (req, res) => {

    const { subdistrictId } = req.params;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const offset = (page - 1) * limit;

    try {

        const result = await pool.query(`
            SELECT *
            FROM villages
            WHERE subdistrict_id = $1
            ORDER BY village_name ASC
            LIMIT $2 OFFSET $3
        `, [subdistrictId, limit, offset]);

        res.json({
            page,
            limit,
            total: result.rows.length,
            data: result.rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

module.exports = router;