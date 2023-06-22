const author        = require('../models/author');
const asynchandler  = require('express-async-handler');

//author details
exports.author_list = asynchandler(async function (req,res,next){
    const authors = await author.find().populate().exec();
    res.render('author_list',{
        title : 'Authors',
        authors: authors,
    })
});

// author page
exports.author_info = asynchandler(async function (req,res,next){
    res.send("TODO");
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