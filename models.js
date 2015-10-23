Tasks = new Mongo.Collection("Tasks");
Projects = new Mongo.Collection("Projects");
FriendRequests = new Mongo.Collection("FriendRequests");


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
    members: {
        type: [Schema.User],
        label: "Members"
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
    },
    removed: {
        type: Boolean,
        autoValue: function() {
            if(this.isInsert) {
                return false;
            }
        }
    },
    status: {
        type: String,
        label: "Status",
        allowedValues: ['In progress', 'At risk', 'Pending information', 'Complete'],
        autoValue: function() {
            if(this.isInsert) {
                return 'In progress';
            }
        }
    },
    numberOfSubTasks: {
        type: Number,
        autoValue: function() {
            if(this.isInsert) {
                return 0;
            }
        }
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
        type: [Schema.User],
        label: "Members"
    },
    dueDate: {
        type: Date,
        label: "Date that the project should be completed by"
    },
    tasks: {
        type: [Schema.Task]
    },
    pm: {
        type: Schema.User
    },
    removed: {
        type: Boolean,
        autoValue: function() {
            if(this.isInsert) {
                return false;
            }
        }
    },
    status: {
        type: String,
        label: "Status",
        allowedValues: ['In progress', 'At risk', 'Complete'],
        autoValue: function() {
            if(this.isInsert) {
                return 'In progress';
            }
        }
    }
});

Schema.FriendRequests = new SimpleSchema({
    from: {
        type: Schema.User
    },
    to: {
        type: Schema.User
    },
    createdAt: {
        type: Date
    },
    status: {
        type: String,
        allowedValues: ['Pending', 'Accepted', 'Rejected']
    }
});

Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        optional: false
    },
    lastName: {
        type: String,
        optional: false
    },
    birthday: {
        type: Date,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    },
    organization : {
        type: String,
        optional: false
    },
    bio: {
        type: String,
        optional: true
    }
});

Schema.User = new SimpleSchema({
    username: {
        type: String,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    colleagues: {
        type: [Schema.User],
        autoValue: function() {
            if(this.isInsert) {
                return [];
            }
        }
    }
});


Tasks.attachSchema(Schema.Task);
Projects.attachSchema(Schema.Project);
FriendRequests.attachSchema(Schema.FriendRequests);
Meteor.users.attachSchema(Schema.User);