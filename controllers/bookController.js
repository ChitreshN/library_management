const Book          = require("../models/book");
const Author        = require('../models/author');
const Genre         = require('../models/genre');
const BookInstance  = require('../models/bookinstance');
const asyncHandler  = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [book_cnt, book_inst_cnt, avail_book_inst_count, author_cnt, genre_cnt,] = await Promise.all([
         Book.countDocuments({}).exec(), BookInstance.countDocuments({}).exec(), BookInstance.countDocuments({status: "Available"}).exec(),
         Author.countDocuments({}).exec(), Genre.countDocuments({}).exec(),
  ]); 

  res.render('index',{
                      title : 'Library',
                    book_cnt: book_cnt,
              book_inst_cnt : book_inst_cnt,
      avail_book_inst_count : avail_book_inst_count,
                  genre_cnt : genre_cnt,
                 author_cnt : author_cnt,
  });
});

// Display list of all books.
exports.book_list = asyncHandler(async (req, res, next) => {
  const books = await Book.find({}, "title author")
                .sort({title: 1})
                .populate("author")
                .exec();
  
  res.render('book_list', {title: 'book  list', book_list: books});
});

// Display detail page for a specific book.
exports.book_detail = asyncHandler(async (req, res, next) => {
  const [book, book_instances] = await Promise.all([
    Book.findById(req.params.id).populate('author').populate('genre').exec(),
    BookInstance.find({book : req.params.id}).exec(),
  ]);

  if (book === null){
    const err = new Error('Book not found');
    err.status = 404;
    return next(err);
  }

  res.render("book_details", {
    title           : book.title,
    book            : book,
    book_instances  : book_instances,
  });

});

// Display book create form on GET.
exports.book_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book create GET");
});

// Handle book create on POST.
exports.book_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book create POST");
});

// Display book delete form on GET.
exports.book_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
});

// Handle book delete on POST.
exports.book_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete POST");
});

// Display book update form on GET.
exports.book_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update GET");
});

// Handle book update on POST.
exports.book_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book update POST");
});
