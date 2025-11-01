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
    