var mongoose = require('mongoose');

var attSchema = mongoose.Schema({
    sid: String,
    date: Date(),
    signature: String,
    onsite: Boolean
});

var Attendence = require('../models/attendence');
app.get('/get-student-att', 'isLoggedIn', function(res, req){
    var id = req.body.id;
    Attendence.find({sid: id}, function(err, ATT){
        if(err)throw err;
        res.send(ATT);
    }).limit(12);
});

var Attendence = require('../models.attendence');
applicationCache.post('/addAttendence, isLoggedIn', function(req, res){
    var student = req.body.student;
    new Att.sid = student.id;
    new Att.date = new Date();
    new Att.signature = student.signature;
    new Att.save();
});

module.exports = mongoose.model('att', attSchema)