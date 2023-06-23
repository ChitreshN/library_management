const mongoose = require("mongoose");

const schema = mongoose.Schema;

const book_schema = new schema({
    title   : {type  : String, required : true},
    summary : {type  : String, required : true},
    isbn    : {type  : String, required : true},
    author  : {type  : schema.Types.ObjectId, ref : "Author", required: true},
    genre   : [{type : schema.Types.ObjectId, ref : "Genre"}],
})


book_schema.virtual("url").get(function(){
    return `/catalog/book/${this.id}`;
})

module.exports = mongoose.model("Book",book_schema);