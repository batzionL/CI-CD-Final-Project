const express = require('express')
require('./db/mongoose')
const routers = require('./server/routes/routes.js')
const path = require('path');

const app = express()
require('dotenv').config();
const port = process.env.PORT
const cors = require('cors');
app.use(cors());


app.use('/login', express.static(path.join(__dirname, 'client/html/login.html')));

app.use('/addproject', express.static(path.join(__dirname, 'client/html/add_project.html')));

app.use('/home', express.static(path.join(__dirname, 'client/html/home_page.html')));

app.use('/Monitoring', express.static(path.join(__dirname, 'client/html/Monitoring_the_project.html')));

app.use('/changepassword', express.static(path.join(__dirname, 'client/html/reset_password.html')));

app.use('/template', express.static(path.join(__dirname, 'client/html/template.html')));

app.use('/addstudent', express.static(path.join(__dirname, 'client/html/add_student.html')));

app.use('/updatedates', express.static(path.join(__dirname, 'client/html/update_dates.html')));

app.use('/assigAndsubDats', express.static(path.join(__dirname, 'client/html/assignments_and_submission_dates.html')));

app.use('/addmoderator', express.static(path.join(__dirname, 'client/html/add_moderator.html')));

app.use('/uploads', express.static('uploads'));

app.use(express.static('uploads'));

app.use('/addcoordinator', express.static(path.join(__dirname, 'client/html/add_coordinator.html')));

app.use('/judge', express.static(path.join(__dirname, 'client/html/judge.html')));

app.use('/css', express.static(path.join(__dirname, 'client/css')));

app.use('/js', express.static(path.join(__dirname, 'client/js')));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', routers);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})