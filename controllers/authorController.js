const Author        = require('../models/author');
const asynchandler  = require('express-async-handler');
const book          = require('../models/book')

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
    res.send("TODO");
});

// author create POST hanler
exports.author_create_POST = asynchandler(async function (req,res,next){
    res.send("TODO");
});

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