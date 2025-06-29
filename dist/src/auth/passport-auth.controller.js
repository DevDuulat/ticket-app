"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassportAuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_guards_1 = require("./guards/auth.guards");
const passport_local_guards_1 = require("./guards/passport-local-guards");
const passport_jwt_guards_1 = require("./guards/passport-jwt-guards");
let PassportAuthController = class PassportAuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    login(request) {
        return this.authService.signIn(request.user);
    }
    getUserInfo(request) {
        return request.user;
    }
};
exports.PassportAuthController = PassportAuthController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('login'),
    (0, common_1.UseGuards)(passport_local_guards_1.PassportLocalGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PassportAuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(auth_guards_1.AuthGuard),
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(passport_jwt_guards_1.PassportJwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PassportAuthController.prototype, "getUserInfo", null);
exports.PassportAuthController = PassportAuthController = __decorate([
    (0, common_1.Controller)('auth-v2'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], PassportAuthController);
//# sourceMappingURL=passport-auth.controller.js.map