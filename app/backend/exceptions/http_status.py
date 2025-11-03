from http import HTTPStatus
from flask import jsonify, Flask

app = Flask(__name__)
app.app_context().push()

with app.app_context():
    
    OK_MSG = jsonify({"msg": "Request successfully made"}), HTTPStatus.OK
    BAD_REQUEST_MSG = jsonify({"msg": "Incorrect or missing parameters"}), HTTPStatus.BAD_REQUEST
    UNAUTHORIZED_MSG = jsonify({"msg": "Invalid credentials"}), HTTPStatus.UNAUTHORIZED
    INTERNAL_SERVER_ERROR_MSG = jsonify({"msg": "An unexpected error occurred"}), HTTPStatus.INTERNAL_SERVER_ERROR
        
    BAD_REQUEST_EMPTY_LOGIN_MSG = jsonify({"msg": "Bad request. Username and password are mandatory fields", "code": "1001"}), HTTPStatus.BAD_REQUEST
    BAD_REQUEST_USERNAME_LOGIN_MSG = jsonify({"msg": "Bad request. Username is a mandatory field", "code": "1002"}), HTTPStatus.BAD_REQUEST
    BAD_REQUEST_PASSWORD_LOGIN_MSG = jsonify({"msg": "Bad request. Password is a mandatory field", "code": "1003"}), HTTPStatus.BAD_REQUEST
    USER_NOT_FOUND_MSG = jsonify({"msg": "The user is not found", "code":"1004"}), HTTPStatus.NOT_FOUND
    UNAUTHORIZED_LOGIN_MSG = jsonify({"msg": "Unauthorized. The credentials are wrong", "code":"1005"}), HTTPStatus.UNAUTHORIZED
    
    BAD_REQUEST_EMPTY_REGISTER_MSG = jsonify({"msg": "Bad request. All the fields are mandatoru","code":"2001"}), HTTPStatus.BAD_REQUEST
    BAD_REQUEST_PASSWORD_MISMATCH_REGISTER_MSG = jsonify({"msg": "Bad request. Passwords do not match", "code":"2002"}), HTTPStatus.BAD_REQUEST
    BAD_REQUEST_INVALID_PASSWORD_REGISTER_MSG = jsonify({"msg": "Bad request. The password is invalid", "code":"2003"}), HTTPStatus.BAD_REQUEST
    BAD_REQUEST_INVALID_DATE_REGISTER_MSG = jsonify({"msg":"Bad request. Invalid date format", "code":"2004"}), HTTPStatus.BAD_REQUEST
    BAD_REQUEST_UNDERAGE_REGISTER_MSG = jsonify({"msg": "Bad request. The user must be over 14", "code":"2005"}), HTTPStatus.BAD_REQUEST
    BAD_REQUEST_USERNAME_ALREADY_EXISTS_REGISTER_MSG = jsonify({"msg": "Bad request. The username already exists", "code":"2006"}), HTTPStatus.BAD_REQUEST
    USER_CORRECT_REGISTER_MSG = ({"msg": "Created. The user was registered correctly", "code":"2007"}), HTTPStatus.CREATED
