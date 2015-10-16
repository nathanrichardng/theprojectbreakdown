Tasks = new Mongo.Collection("Tasks");
Projects = new Mongo.Collection("Projects");


var Schema = {};


Schema.Task = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    description: {
        type: String,
        label: "Description",
        max: 1000
    },
    owner: {
        type: String,
        label: "Task Owner"
    },
    dueDate: {
        type: Date,
        label: "Date that the task should be completed by"
    },
    parentTask: {
        type: Schema.Task,
        optional:true
    },
    project: {
        type: Schema.Project
    }
});

Schema.Project = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    description: {
        type: String,
        label: "Description",
        max: 1000
    },
    members: {
        type: [String],
        label: "Members"
    },
    dueDate: {
        type: Date,
        label: "Date that the project should be completed by"
    },
    tasks: {
        type: [Schema.Task]
    }
});


Tasks.attachSchema(Schema.Task);
Projects.attachSchema(Schema.Project);