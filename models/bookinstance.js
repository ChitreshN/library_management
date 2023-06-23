const mongoose = require("mongoose");
const {DateTime} = require('luxon');
const schema = mongoose.Schema;

const book_instance_schema = new schema({
  book      : { type: schema.Types.ObjectId, ref: "Book", required: true }, // reference to the associated book
  imprint   : { type: String, required: true },
  status    : {
                type    : String,
                required: true,
                enum    : ["Available", "Maintenance", "Loaned", "Reserved"],
                default : "Maintenance",
        },
  due_back  : { type: Date, default: Date.now },
});

// Virtual for bookinstance's URL
book_instance_schema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/bookinstance/${this._id}`;
});

book_instance_schema.virtual("due_back_formatted").get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

// Export model
module.exports = mongoose.model("BookInstance", book_instance_schema);
