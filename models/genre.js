const mongoose  = require("mongoose");
const schema    = mongoose.Schema;

const genre_schema = new schema({
    name    : {type : String, minlength: 3, maxlength:100 },
})

genre_schema.virtual("url").get(function(){
    return `/catalog/genre/${this.id}`;
})

module.exports = mongoose.model("Genre",genre_schema);