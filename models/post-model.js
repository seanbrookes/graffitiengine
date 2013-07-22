/**
 * Seanica

 *
 * User: sean
 * Date: 09/06/13
 * Time: 8:00 AM
 *
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    userId : {type: String, required: true },
    title : {type: String, required: true },
    slug : {type: String, required: true },
    status: {type: String },
    summary: {type: String },
    body : {type: String },
    author: {type: String },
    date : {type: Date, default: Date.now },
    publishDate: {type: Date },
    lastUpdate: {type: Date, default: Date.now }

});

module.exports = mongoose.model('Post', PostSchema);