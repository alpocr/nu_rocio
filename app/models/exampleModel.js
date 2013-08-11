/* ===================
    Variables
   =================== */

// Main dependecies
var Schema = _MONGOOSE.Schema;

/* ===================
    Schema
   =================== */

// Schema example
var exampleSchema = new Schema({

    id: {
        type: Number,
        default: 0,
        trim: true
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    body: {
        type: String,
        default: '',
        trim: true
    },
    /*    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    comments: [{
        body: {
            type: String,
            default: ''
        },
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    tags: {
        type: [],
        get: getTags,
        set: setTags
    },
    image: {
        cdnUri: String,
        files: []
    },*/
    createdAt: {
        type: Date,
        default: Date.now
    }

});



/* ===================
    Methods
   =================== */

exampleSchema.method({



});

/* ===================
    Statics
   =================== */

exampleSchema.static({


});

/* ===================
    Register
   =================== */

_MONGOOSE.model('ExampleModel', exampleSchema);