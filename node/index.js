const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const create_table = `CREATE TABLE people(id int not null auto_increment, name varchar(255), primary key(id))`
connection.query(create_table)
const insert_user1 = `INSERT INTO people(name) values('Wesley')`
const insert_user2 = `INSERT INTO people(name) values('Edu')`
const insert_user3 = `INSERT INTO people(name) values('Maria')`
connection.query(insert_user1)
connection.query(insert_user2)
connection.query(insert_user3)
const load_users = `SELECT * FROM people`

app.set('view engine', 'ejs');
app.get('/', (req,res) => {
    connection.query(load_users, (err, result, fields) => {
        if(err){
            throw err;
        }
        res.render('user-list', { title: 'User List', userData: result});
        connection.end()
    })
})


app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})