const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const stateRoutes = require('./routes/stateRoutes');
const districtRoutes = require('./routes/districtRoutes');
const subdistrictRoutes = require('./routes/subdistrictRoutes');
const villageRoutes = require('./routes/villageRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/states', stateRoutes);
app.use('/api/districts', districtRoutes);
app.use('/api/subdistricts', subdistrictRoutes);
app.use('/api/villages', villageRoutes);
app.use('/api/search', searchRoutes);

app.get('/', async (req, res) => {

    try {

        const result = await pool.query('SELECT NOW()');

        res.json({

            status: 'success',

            message: 'All India Village API Running',

            time: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).send('Database connection error');
    }
});

app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).json({

        status: 'error',

        message: 'Something went wrong'
    });
});

module.exports = app;