"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(user) {
        this.email = '';
        this.isAdmin = false;
        this.name = '';
        this.password = '';
        if (user) {
            this._id = user._id;
            this.email = user.email;
            this.name = user.name;
            this.password = user.password;
            this.isAdmin = user.isAdmin || false;
        }
    }
    updatePassword(newPassword) {
        this.password = newPassword;
        return Object.assign({}, this);
    }
    deletePassWord() {
        this.password = '';
    }
}
exports.default = User;
