"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const users = [
    { name: 'Alexandre' },
    { name: 'Pooya' },
    { name: 'Sébastien' },
];
router.get('/users', function (req, res, next) {
    res.json(users);
});
router.get('/users/:id', function (req, res, next) {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < users.length) {
        res.json(users[id]);
    }
    else {
        res.sendStatus(404);
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map