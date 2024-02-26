const {validationResult} = require("express-validator");

module.exports = (request, response, next) =>{
    let result = validationResult(request);
    if(result.errors.length >= 1){
        let errorMsgs = result.errors.reduce((current, error)=>
            current + error.msg + " , " , ""
        )
        let error = new Error(errorMsgs);
        // console.log(errorMsgs);
        error.status = 422;
        next(error);
    }
    else
        next();
}