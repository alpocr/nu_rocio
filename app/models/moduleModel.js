/* ===================
    Variables
   =================== */

// Main dependecies
var Schema = _MONGOOSE.Schema;

/* ===================
    Schema
   =================== */

var moduleSchema = new Schema({

    name: {
        type: String,
        default: '',
        trim: true,
        index: {
            unique: true
        }
    },
    functions: [{
        type: Schema.Types.ObjectId,
        ref: "Function"
    }],
    // Defaults     
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    },
    modifiedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    deletedAt: {
        type: Date,
        default: null
    }
});

/* ===================
    Methods
   =================== */

moduleSchema.method({

    createIt: function(callback) {
        console.log(_DEBUG + "CREATING MODULE..."); //DEBUG
        var self = this;
        self.save(callback);
    }

});

/* ===================
    Statics
   =================== */

moduleSchema.static({

    readIt: function(id, callback) {
        console.log(_DEBUG + "READING MODULE..."); //DEBUG
        this.findOne({
            _id: id
        })
            .populate("functions").exec(callback)
    },

    updateIt: function(id, object, modifiedBy, callback) {
        console.log(_DEBUG + "UPDATING MODULE..."); //DEBUG
        this.update({
                _id: id
            }, {
                //Estos params son custom según el modelo que se esté actualizando
                name: object.name,
                functions: object.functions,
                modifiedAt: Date.now(),
                modifiedBy: modifiedBy
            },
            null, callback);
    },

    //No lo borra realmente, solo lo "deshabilita"
    deleteIt: function(id, modifiedBy, callback) {
        console.log(_DEBUG + "DELETING MODULE..."); //DEBUG
        this.update({
                _id: id
            }, {
                modifiedBy: modifiedBy,
                deletedAt: Date.now(), //Le quita el NULL default, y le pone la fecha de hoy
            },
            null, callback);
    },

    loadAll: function(callback) {
        console.log(_DEBUG + "LOADING MODULES..."); //DEBUG
        this.find().populate("functions").sort('createdAt').exec(callback)
    },

    loadFromArray: function(array, callback) {
        console.log(_DEBUG + "LOADING MODULE FROM ARRAY: ", array); //DEBUG
        this.find({
            '_id': {
                $in: array
            }
        }).populate("functions").sort('createdAt').exec(callback)
    }
});

/* ===================
    Register
   =================== */

_MONGOOSE.model('Module', moduleSchema);