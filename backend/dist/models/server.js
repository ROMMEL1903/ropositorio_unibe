"use strict";
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const materias_1 = __importDefault(require("../routes/materias"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const materias_2 = require("./materias");
const usuario_2 = require("./usuario");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo' + this.port);
        });
    }
    routes() {
        this.app.use('/materias', materias_1.default);
        this.app.use('/usuarios', usuario_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    dbConect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield materias_2.Materia.sync();
                yield usuario_2.Usuario.sync();
            }
            catch (error) {
                console.log('Errooo >:( ', error);
            }
        });
    }
}
exports.default = Server;
