const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.DATABASE_PORT || 3000
const bodyParser = require('body-parser')
const response = require('./response')
const db = require('./connection')
const table1 = '`nomor-osis`'
const table2 = '`periode-osis`'

app.use(bodyParser.json())
app.use(cors({ origin: 'https://jund-fauz.github.io'}))

require('dotenv').config()

app.get('/', (req, res) => {
    res.send('STATUS: API READY')
})

app.get('/nomor-surat', (req, res) => {
    const query = `SELECT * FROM ${table1}`
    db.query(query, (error, fields) => {
        if (error) response(res, 'invalid', 'error', 500)
        response(res, 'List nomor surat berhasil diberikan', fields)
    })
})

app.post('/nomor-surat', (req, res) => {
    const date = new Date()
    const { jenisSurat, pengirim = 'Sekretaris', tanggal = date.getDate(), bulan = date.getMonth()+1, tahun = date.getFullYear(), perihal = null, link = null, withDate = true } = req.body
    let dateStr = withDate ? tanggal : 0
    const query = `INSERT INTO ${table1} (jenis_surat, pengirim, tanggal, bulan, tahun, perihal, link) VALUES ('${jenisSurat}', '${pengirim}', ${dateStr}, ${bulan}, ${tahun}, '${perihal}', '${link}')`
    db.query(query, (error, fields) => {
        if (error) response(res, 'invalid', 'error', 500)
        else if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId
            }
            response(res, 'Data Added Successfuly', data, 200)
        } else response(res, 'Gagal menambahkan data nomor surat OSIS', 'error', 400)
    })
})

app.put('/nomor-surat/:id', (req, res) => {
    const { id } = req.params
    const { jenisSurat, pengirim, perihal = null, link = null } = req.body
    const query = `UPDATE ${table1} SET jenis_surat = '${jenisSurat}', pengirim = '${pengirim}', perihal = '${perihal}', link = '${link}' WHERE id = ${id}`
    db.query(query, (error, fields) => {
        if (error) response(res, 'invalid', 'error', 500)
        else if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId
            }
            response(res, 'Data Updated Successfuly', data, 200)
        } else {
            response(res, 'Data tidak ditemukan', 'error: not found', 404)
        }
    })
})

app.put('/nomor-surat/:id/link', (req, res) => {
    const { id } = req.params
    const { link } = req.body
    const query = `UPDATE ${table1} SET link = '${link}' WHERE id = ${id}`
    db.query(query, (error, fields) => {
        if (error) response(res, 'invalid', 'error', 500)
        else if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId
            }
            response(res, 'Data Updated Successfuly', data, 200)
        } else {
            response(res, 'Data tidak ditemukan', 'error: not found', 404)
        }
    })
})

app.delete('/nomor-surat/:id', (req, res) => {
    const { id } = req.params
    const query = `DELETE FROM ${table1} WHERE id = ${id}`
    db.query(query, (error, fields) => {
        if (error) response(res, 'invalid', 'error', 500)
        else if (fields?.affectedRows) {
            const data = {
                isDeleted: fields.affectedRows
            }
            response(res, 'Data Deleted Successfully', data)
        } else {
            response(res, 'Data tidak ditemukan', 'error: not found', 404)
        }
    })
})

app.delete('/nomor-surat', (req, res) => {
    const query = `DELETE FROM ${table1}`
    db.query(query, (error, fields) => {
        if (error) response(res, 'invalid', 'error', 500)
        else if (fields?.affectedRows) {
            const data = {
                isDeleted: fields.affectedRows
            }
            response(res, 'Data Deleted Successfully', data)
        }
    })
    db.query(`ALTER TABLE ${table1} AUTO_INCREMENT = 1`)
})

app.get('/periode', (req, res) => {
    const query = `SELECT * FROM ${table2}`
    db.query(query, (error, fields) => {
        if (error) response(res, 'invalid', 'error', 500)
        response(res, fields, 'Data periode OSIS sekarang berhasil diberikan')
    })
})

app.post('/:year', (req, res) => {
    const { year } = req.params
    const query = `INSERT INTO ${table2} (periode) VALUES (${year})`
    db.query(query, (error, fields) => {
        if (error) response(res, 'invalid', 'error', 500)
        else if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId
            }
            response(res, 'Data Added Successfuly', data, 200)
        }
    })
})

app.put('/:year', (req, res) => {
    const { year } = req.params
    const query = `UPDATE ${table2} SET periode = ${year}`
    db.query(query, (error, fields) => {
        if (error) response(res, 'invalid', 'error', 500)
        else if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                message: fields.message
            }
            response(res, 'Data Updated Successfull data,y')
        }
    })
})

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})