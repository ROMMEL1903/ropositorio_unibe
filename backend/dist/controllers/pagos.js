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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPago = exports.newPago = void 0;
const pago_1 = require("../models/pago");
const newPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idFactura, nombre, cedula, cancelado, total } = req.body;
    const pago = yield pago_1.Pago.findOne({ where: { idFactura: idFactura } });
    if (pago) {
        return res.status(400).json({
            msg: 'Por favor realice el pago de la factura' + idFactura
        });
    }
    try {
        yield pago_1.Pago.create({
            idFactura: idFactura,
            nombre: nombre,
            cedula: cedula,
            cancelado: cancelado,
            total: total
        });
        res.json({
            msg: 'Porfavor realice el pago de su facturahfgh' + idFactura
        });
    }
    catch (error) {
    }
});
exports.newPago = newPago;
const getPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idFactura } = req.query;
    const pago = yield pago_1.Pago.findOne({ where: {
            idFactura: idFactura,
        } });
    if (pago) {
        res.json(pago);
    }
    else {
        res.status(404).json({
            msg: 'No existe el pago'
        });
    }
});
exports.getPago = getPago;
