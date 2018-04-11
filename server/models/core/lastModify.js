"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = exports = function lastModifiedPlugin(schema, options) {
    schema.add({ lastMod: Date });
    console.log('2', this);
    schema.pre('save', function (next) {
        console.log('111', this);
        this.lastMod = new Date;
        next();
    });
    if (options && options.index) {
        schema.path('lastMod').index(options.index);
    }
};
//# sourceMappingURL=lastModify.js.map