const express = require('express');
const app = express();
const port = 8052;

let tasks = []; 

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    return res.render('index', { tasks });
});


app.post('/add', (req, res) => {
    const { id, task } = req.body;
    if (task) { 
        tasks.push({ id, task });
    }
    // console.log("Task Added:", req.body);
    return res.redirect('/');
});

app.get('/delete', (req, res) => {
    const taskId = req.query.id;
    tasks = tasks.filter(task => task.id != taskId); 
    return res.render('dataview', { tasks }); 
});


app.get('/edit', (req, res) => {
    const taskId = req.query.id;
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        res.render('edit', { task });
    } else {
        return res.render('dataview', { tasks });
    }
});

app.post('/edit', (req, res) => {
    const { id, task } = req.body; 
    const index = tasks.findIndex(t => t.id == id);
    
    if (index !== -1) {
        tasks[index].task = task; 
    }
    
    return res.render('dataview', { tasks });
});


app.get('/viewdata', (req, res) => {
    return res.render('dataview', { tasks }); 
});

app.get('/dataview', (req, res) => {
    return res.render('dataview', { tasks }); 
});

app.listen(port, (err) => {
    if (!err) {
        console.log("Server started on");
        console.log("http://localhost:" + port);
    }
});
