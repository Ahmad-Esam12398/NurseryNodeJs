const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
module.exports = (request, response, next) => {
  try {
    // console.log(request.get("authorization").split(" ")[1])
    let token = request.get("authorization").split(" ")[1];
    let decodedToken = jwt.verify(token, process.env.secret_key);
    request.token = decodedToken;
    console.log(request.token);
    next();
  } catch (error) {
    error.message = "not authenticated ";
    error.status = 401;
    next(error);
  }
};

module.exports.isAdmin = (request, response, next) => {
  if (request.token.role == "Admin") next();
  else {
    let error = new Error("not authorized");
    error.status = 403;
    next(error);
  }
};
module.exports.isTeacher = (request, response, next) => {
  if (request.token.role == "Teacher") next();
  else {
    let error = new Error("not authorized");
    error.status = 403;
    next(error);
  }
};
module.exports.isAdminOrTeacher = (request, response, next)=>{
    if(request.token.role == "Teacher" ||request.token.role == "Admin" ) next();
    else {
        let error = new Error("not Authorized");
        error.status = 403;
        next(error);
    }
}
module.exports.isYourData = (request, response, next)=>{
	if(request.token.id == request.body.id) next();
	else{
		let error = new Error("Not Authorized");
		error.status = 403;
		next(error);
	}
}

