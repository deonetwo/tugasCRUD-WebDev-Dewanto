
const express = require('express');
const { Client } = require('pg');
const connectionString = 'postgres://postgres:242136@localhost:5432/WebDev';

const client = new Client({
    connectionString: connectionString
});

client.connect();

var app = express();

app.set('port', process.env.PORT || 4000);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/news', function (req, res, next) {
    client.query('SELECT * FROM public.berita ORDER BY id', function (err, result) {      
        if (err) {
            //Buat database dan tabel baru
            console.log(err);
            res.status(400).send(err);
        }
        res.send(result.rows);
    });
});

app.use(express.json())

app.post('/news/', function(req, res, next) {
    //console.log(req.body.name)
    client.query("INSERT INTO public.berita(id,judul_berita,konten,kategori) VALUES (nextval('berita_id'),$1,$2,$3)",[req.body.judul,req.body.konten,req.body.kategori], function (err, result) {      
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        //console.log('you did it')
    })
    res.send()
});

app.post('/update/', function(req, res, next) {
    //console.log(req.body.id)
    //console.log(req.body.konten)
    client.query("UPDATE public.berita SET judul_berita=$1, konten=$2, kategori=$3 WHERE id=$4;",[req.body.judul,req.body.konten,req.body.kategori,req.body.id], function (err, result) {      
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        //console.log('you did it')
    })
    res.send()
});

app.post('/delete/', function(req, res, next) {
    //console.log(req.body.id)
    client.query("DELETE FROM public.berita WHERE id=$1;",[req.body.id], function (err, result) {      
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        //console.log('you did it')
    })
    res.send()
});

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});