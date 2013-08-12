/* ===================
    Variables
   =================== */

// Main dependecies
var Schema = _MONGOOSE.Schema;

/* ===================
    Schema
   =================== */

var functionSchema = new Schema({

    name: {
        type: String,
        default: '',
        trim: true
    },
    path: {
        type: String,
        default: '',
        trim: true
    },
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

functionSchema.method({

    createIt: function(callback) {
        console.log(_DEBUG + "CREATING FUNCTION..."); //DEBUG
        var self = this;
        self.save(callback);
    }

});

/* ===================
    Statics
   =================== */

functionSchema.static({

    readIt: function(id, callback) {
        console.log(_DEBUG + "READING FUNCTION..."); //DEBUG
        this.findOne({
              _id: id
            })
            .exec(callback)
    },

    updateIt: function(id, object, modifiedBy, callback) {
        console.log(_DEBUG + "UPDATING FUNCTION..."); //DEBUG
        this.update(
            { _id: id }, 
            { 
                //Estos params son custom según el modelo que se esté actualizando
                name: object.name,
                path: object.path,
                modifiedAt: Date.now,
                modifiedBy: modifiedBy
            }, 
            null, callback);
    },

    //No lo borra realmente, solo lo "deshabilita"
    deleteIt: function(id, modifiedBy, callback) {
        console.log(_DEBUG + "DELETING FUNCTION..."); //DEBUG
        this.update(
            { _id: id }, 
            { 
                modifiedBy: modifiedBy,
                deletedAt: Date.now(), //Le quita el NULL default, y le pone la fecha de hoy
            }, 
            null, callback);
    },

    loadAll: function(callback) {
        console.log(_DEBUG + "LOADING FUNCTIONS..."); //DEBUG
        this.find().sort('createdAt').exec(callback)
    },
});

/* ===================
    Register
   =================== */

_MONGOOSE.model('Function', functionSchema);