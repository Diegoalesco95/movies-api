"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const buildMessage_1 = __importDefault(require("src/utils/buildMessage"));
describe.only('utils - buildMessage', function () {
    describe('when receive an entity and a action', function () {
        it('should return the respective message', function () {
            const result = (0, buildMessage_1.default)('movie', 'create');
            const expect = 'movie created';
            assert_1.default.strictEqual(result, expect);
        });
    });
    describe('when receives an entity and an action and is a list', function () {
        it('should return the respective message with the entity in plural', function () {
            const result = (0, buildMessage_1.default)('movie', 'list');
            const expected = 'movies listed';
            assert_1.default.strictEqual(result, expected);
        });
    });
});
