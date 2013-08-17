/* ===================
    Variables
   =================== */

// Main dependecies
var Schema = _MONGOOSE.Schema;

/* ===================
    Schema
   =================== */

var userSchema = new Schema({

    name: {
        type: String,
        default: '',
        trim: true
    },
    lastname: {
        type: String,
        default: '',
        trim: true
    },
    username: {
        type: String,
        trim: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: "Profile",
        default: null
    },
    lastLogin: {
        type: Date,
        default: Date.now
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
        ref: "User",
        default: null
    },
    deletedAt: {
        type: Date,
        default: null
    }
});

/* ===================
    Methods
   =================== */

userSchema.method({

    createIt: function(callback) {
        console.log(_DEBUG + "CREATING USER..."); //DEBUG
        var self = this;
        self.save(callback);
    },

    validPassword: function(password) {
        console.log(_DEBUG + "VALIDATING USUARIO PASS..."); //DEBUG
        if (this.password == password) return true;
        else return false;
    },

});

/* ===================
    Statics
   =================== */

userSchema.static({

    readIt: function(id, callback) {
        console.log(_DEBUG + "READING USER..."); //DEBUG
        this.findOne({
            _id: id
        })
            .populate("profile", "name").exec(callback)
    },

    updateIt: function(id, object, modifiedBy, callback) {
        console.log(_DEBUG + "UPDATING USER..."); //DEBUG
        this.update({
                _id: id
            }, {
                //Estos params son custom según el modelo que se esté actualizando
                name: object.name,
                lastname: object.lastname,
                profile: object.profile,
                modifiedAt: Date.now(),
                modifiedBy: modifiedBy
            },
            null, callback);
    },

    //No lo borra realmente, solo lo "deshabilita"
    deleteIt: function(id, modifiedBy, callback) {
        console.log(_DEBUG + "DELETING USER..."); //DEBUG
        this.update({
                _id: id
            }, {
                modifiedBy: modifiedBy,
                deletedAt: Date.now(), //Le quita el NULL default, y le pone la fecha de hoy
            },
            null, callback);
    },

    loadAll: function(callback) {
        console.log(_DEBUG + "LOADING USERS..."); //DEBUG
        this.find().populate("profile", "name").sort('createdAt').exec(callback)
    },
});

/* ===================
    Register
   =================== */

_MONGOOSE.model('User', userSchema);