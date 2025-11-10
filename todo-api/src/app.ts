import express from "express"
import "reflect-metadata"
import DataSource from "./config/data-source";
import {Task} from "./features/tasks/models/task";


const app = express();
const port = 3000;

DataSource.initialize().then(() => {
    const tasksRepository = DataSource.getRepository(Task)

    tasksRepository.find().then(x => console.log("All photos from the db: ", x))
});




app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});