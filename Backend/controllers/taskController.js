const Task = require("../models/task");

async function getTasks(req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 1000;
        const skip = (page - 1) * limit;

        // console.log(req.query);

        const completed = req.query.completed;
        const sort = req.query.sort;
        const search = req.query.search;

        // console.log(sort);

        // console.log(completed);

        const filter = {
            userId: req.user.id,
        };

        if (search) {
            filter.title = {
                $regex: search,
                $options: "i"
            };
        }
        const sortOption = {

        };

        if (sort == "asc") {
            sortOption.createdAt = 1;
        } else
            if (sort == "desc") {
                sortOption.createdAt = -1;
            }

        // console.log(sortOption);


        if (completed !== undefined) {
            filter.completed = completed === "true";
        }

        const allTask = await Task.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);
        return res.json(allTask);
    }
    catch (error) {
        next(error);
    }

}

async function getTaskById(req, res, next) {

    try {
        const taskById = await Task.findById(req.params.id);
        if (!taskById) {
            res.status(404);
            throw new Error("Task not found");
            // return res.status(404).json({ error: "Task not found" });
        }

        return res.json(taskById);
    }
    catch (error) {
        next(error);
        // return res.status(500).json({ message: error.message });
    }
}

async function createTasks(req, res, next) {

    try {
        // console.log(req.body);
        // console.log(req.user);


        const body = req.body;
        if (!body.title) {
            return res.status(400).json({ error: "Title is required" });
        }
        const task = await Task.create({

            title: body.title,
            description: body.description,
            completed: body.completed,
            userId: req.user.id
            // timeStamps: body.timeStamps,
        });
        return res.json(task);
    }

    catch (error) {
        next(error);
    }
}


async function updateTasks(req, res, next) {

    try {

        const updatedTask = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.id
            },
            req.body,
            { returnDocument: "after" });


        if (!updatedTask) {
            return res.status(403).json({ message: "Not authorized" });
        }
        return res.json(updatedTask);
        // { new: "truer" } use this instead of {new: true}
    }
    catch (error) {
        next(error);
    }

}

async function deleteTasks(req, res, next) {
    console.log("DELETE ROUTE HIT");

    try {
        const deletedTask = await Task.findOneAndDelete({
            _id: req.params.id,
            // userId: req.user.id
        }
        );

        if (!deletedTask) {
            return res.status(403).json({ message: "Not authorized" });
        }
        return res.json({ message: "Task deleted successfully" });
    }
    catch (error) {
        next(error);
    }


}
// async function deleteTasks(req, res, next) {
// const deletedTask = await Task.findByIdAndDelete(
//     req.params.id
// );

// console.log(deletedTask);
// }
module.exports = {
    getTasks,
    createTasks,
    updateTasks,
    deleteTasks,
    getTaskById,
}