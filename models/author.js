const mongoose = require("mongoose");

const schema = mongoose.Schema;

const author_schema = new schema({
    first_name        : {type: String, required: true, maxlength:100},
    family_name       : {type: String, required: true, maxlength:100},
    date_of_birth     : {type: Date},
    date_of_death     : {type: Date},
})

// virtual for author's full name, so that dont have to store redundant information in server

author_schema.virtual("name").get(function(){

    let fullname = "";
    if (this.first_name && this.family_name){
        fullname = `${this.family_name},${this.first_name}`;
    }
    return fullname;
})

author_schema.virtual("url").get(function(){
    return `catalog/author/${this.id}`;
})

module.exports = mongoose.model("Author",author_schema);