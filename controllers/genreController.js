const Genre = require("../models/genre");
const Book = require('../models/book');
const asyncHandler = require("express-async-handler");
const {body, validationResult} = require('express-validator');


// Display list of all Genre.
exports.genre_list = asyncHandler(async (req, res, next) => {
  const genres = await Genre.find().populate('name').exec();
  res.render('genre_list',{
    title   : 'Genre list',
    genres  : genres,
  });
});

// Display detail page for a specific Genre.
exports.genre_detail = asyncHandler(async (req, res, next) => {
  const [genre, books] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({genre: req.params.id}, 'title summary').exec(),
  ]);

  if (genre === null){
    const err = new Error("Genre not foud");
    err.status = 404;
    return next(err);
  }

  res.render('genre_detail',{
    title : 'genre info',
    genre : genre,
    books : books,
  })
});

// Display Genre create form on GET.
exports.genre_create_get = asyncHandler(async (req, res, next) => {
  res.render('genre_form',{title: 'Create Genre'});
});

// Handle Genre create on POST.
exports.genre_create_post = [
    body("name", "Must contain atleast 3 characters").trim().isLength({min : 3}).escape(),
    

    //Process form after sanitazing and checking the form
    asyncHandler(async(req,res,next) =>{
        const errors =  validationResult(req);
        const genre = new Genre({name : req.body.name });

        if (!errors.isEmpty()) {
            res.render('genre_form',{
                title : 'genre form',
                genre : genre,
                errors: errors.array(),
            });
        }
        else {
            const genre_exists = await Genre.findOne({name : req.body.name}).exec();
            if (genre_exists){
                res.redirect(genre_exists.url);
            }
            else {
                await genre.save();
                res.redirect(genre.url);
            }
        }
    }),
]; 
// Display Genre delete form on GET.
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
});

// Handle Genre delete on POST.
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
});

// Display Genre update form on GET.
exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
});

// Handle Genre update on POST.
exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
});
