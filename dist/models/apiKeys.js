"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiKey {
    constructor(apiKey) {
        this.token = '';
        this.scopes = [''];
        if (apiKey) {
            this._id = apiKey._id;
            this.token = apiKey.token;
            this.scopes = apiKey.scopes;
        }
    }
}
exports.default = ApiKey;
