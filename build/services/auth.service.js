"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const User_1 = require("../database/models/User");
const response_class_1 = require("../utils/response.class");
const http_status_codes_1 = require("http-status-codes");
class AuthService {
    //#region Sign up
    signup(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new User_1.User(userData);
                const savedUser = yield user.save();
                savedUser["password"] = undefined;
                return { user: savedUser, token: this.generateJWT(savedUser) };
            }
            catch (err) {
                throw err;
            }
        });
    }
    //#endregion
    //#region Login
    login(loginData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne({ email: loginData.email });
                if (!user) {
                    throw new response_class_1.ErrorResponse(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid username or password");
                }
                const isPasswordMatch = yield bcryptjs_1.default.compare(loginData.password, user["password"]);
                if (!isPasswordMatch) {
                    throw new response_class_1.ErrorResponse(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid username or password");
                }
                return { token: this.generateJWT(user) };
            }
            catch (err) {
                throw err;
            }
        });
    }
    //#endregion
    generateJWT(user) {
        return jwt.sign({ id: user["id"] }, process.env.TOKEN_SECRET);
    }
}
exports.authService = new AuthService();
