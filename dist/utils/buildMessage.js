"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildMessage(entity, action) {
    if (action === 'list') {
        return `${entity}s ${action}ed`;
    }
    return `${entity} ${action}d`;
}
exports.default = buildMessage;
