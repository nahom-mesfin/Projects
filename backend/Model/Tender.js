const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
title: {
type: String,
required: true,
},
description: {
type: String,
required: true,
},
closingDate: {
type: Date,
required: true,
},
budget: {
type: Number,
required: true,
},
status: {
type: String,
required: true,
},
type: {
type: String,
required: true,
},
});

const Tender = mongoose.model('Tender', tenderSchema);

module.exports = Tender;