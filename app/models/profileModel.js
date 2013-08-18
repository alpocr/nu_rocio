/* ===================
    Variables
   =================== */

// Main dependecies
var Schema = _MONGOOSE.Schema;

/* ===================
    Schema
   =================== */

var profileSchema = new Schema({

    name: {
        type: String,
        default: '',
        trim: true,
        index: {
            unique: true
        }
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    apps: [{
        type: Schema.Types.ObjectId,
        ref: "App"
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

profileSchema.method({

    createIt: function(callback) {
        console.log(_DEBUG + "CREATING PROFILE..."); //DEBUG
        var self = this;
        self.save(callback);
    }

});

/* ===================
    Statics
   =================== */

profileSchema.static({

    readIt: function(id, callback) {
        console.log(_DEBUG + "READING PROFILE..."); //DEBUG
        this.findOne({
            _id: id
        })
            .populate("apps").exec(callback)
    },

    updateIt: function(id, object, modifiedBy, callback) {
        console.log(_DEBUG + "UPDATING PROFILE..."); //DEBUG
        this.update({
                _id: id
            }, {
                //Estos params son custom según el modelo que se esté actualizando
                name: object.name,
                description: object.description,
                apps: object.apps,
                modifiedAt: Date.now(),
                modifiedBy: modifiedBy
            },
            null, callback);
    },

    //No lo borra realmente, solo lo "deshabilita"
    deleteIt: function(id, modifiedBy, callback) {
        console.log(_DEBUG + "DELETING PROFILE..."); //DEBUG
        this.update({
                _id: id
            }, {
                modifiedBy: modifiedBy,
                deletedAt: Date.now(), //Le quita el NULL default, y le pone la fecha de hoy
            },
            null, callback);
    },

    loadAll: function(callback) {
        console.log(_DEBUG + "LOADING PROFILES..."); //DEBUG
        this.find().populate("apps").sort('createdAt').exec(callback)
    },
});

/* ===================
    Register
   =================== */

_MONGOOSE.model('Profile', profileSchema);