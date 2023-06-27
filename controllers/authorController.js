const Author        = require('../models/author');
const asynchandler  = require('express-async-handler');
const book          = require('../models/book');
const {body, validationResult} = require('express-validator')
//author details
exports.author_list = asynchandler(async function (req,res,next){
    const authors = await Author.find().populate().exec();
    res.render('author_list',{
        title : 'Authors',
        authors: authors,
    })
});

// author page
exports.author_info = asynchandler(async function (req,res,next){
    const [author, books] = await Promise.all([
        Author.findById(req.params.id).exec(),
        book.find({author : req.params.id}).exec(),        
    ])

    if (author === null){
        const err = new err('Author not found');
        err.status(404);
        return next(err);
    }

    res.render('author_detail',{
        title : "Author detail",
        author: author,
        books : books,
    })

});

// author create GET form
exports.author_create_GET = asynchandler(async function (req,res,next){
    res.render('author_create',{title: 'Create Author'});
});

// author create POST hanler
exports.author_create_POST = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

    asynchandler(async(req,res,next) => {
        const errors = validationResult(req);
        const author = new Author({ first_name : req.body.first_name,
                                    family_name  : req.body.family_name,
                                    date_of_birth: req.body.date_of_birth,
                                    date_of_death: req.body.date_of_death,
        });

        if (!errors.isEmpty()){
            res.render('author_create',{
                title : 'Create author',
                author : author,
                errors : errors.array(),
            });
        }
        else {
            await author.save();
            res.redirect(author.url);
        }
    }),
];


// author delete form
exports.author_del_GET = asynchandler(async function (req,res,next){
    res.send("TODO");
})

// author delete POST
exports.author_del_POST = asynchandler(async function (req,res,next){
    res.send("TODO");
})

// Author update form GET
exports.author_up_GET = asynchandler(async function (req,res,next){
    res.send("TODO");
})

// author del POST
exports.author_up_POST = asynchandler(async function (req,res,next){
    res.send("TODO");
})
