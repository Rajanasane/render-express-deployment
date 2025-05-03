const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

app.get('/', function (req, res) {
    const filter = req.query.priority;
    let filteredItems = items;

    if (filter && filter !== 'All') {
        filteredItems = items.filter(item => item.priority === filter);
    }

    res.render("list", { tasks: filteredItems });
});

app.post('/add', function (req, res) {
    const taskText = req.body.task.trim();
    const priority = req.body.priority;

    if (taskText !== "") {
        items.push({ id: Date.now(), task: taskText, priority: priority });
    }

    res.redirect('/');
});

app.post('/delete', function (req, res) {
    const idToDelete = Number(req.body.id);
    items = items.filter(item => item.id !== idToDelete);
    res.redirect('/');
});

app.post('/edit', function (req, res) {
    const idToEdit = Number(req.body.id);
    const newTask = req.body.updatedTask.trim();
    const newPriority = req.body.updatedPriority;

    if (newTask !== "") {
        const item = items.find(i => i.id === idToEdit);
        if (item) {
            item.task = newTask;
            item.priority = newPriority;
        }
    }
    res.redirect('/');
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
