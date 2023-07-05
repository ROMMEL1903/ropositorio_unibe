"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const router = (0, express_1.Router)();
router.post('/', usuarios_1.newUser);
router.post('/login', usuarios_1.loginUser);
exports.default = router;
