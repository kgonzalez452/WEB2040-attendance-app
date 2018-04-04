var Attendence = require('../models/attendence');
app.get('/get-student-att', 'isLoggedIn', function(res, req){
    var id = req.body.id;
    Attendence.find({sid: id}, function(err, ATT){
        if(err)throw err;
        res.send(ATT);
    }).limit(12);
});