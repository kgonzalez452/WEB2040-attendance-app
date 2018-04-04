var Attendence = require('../models/attendence');
applicationCache.post('/addAttendence', isLoggedIn, function(req, res){
    var student = req.body.student;
    new Att.sid = student.id;
    new Att.date = new Date();
    new Att.signature = student.signature;
    new Att.save();
});