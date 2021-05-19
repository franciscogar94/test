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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
//const fs = require('fs');
var lighthouse = require('lighthouse');
var chromeLauncher = require('chrome-launcher');
var Test = /** @class */ (function () {
    function Test() {
        this.urls = [
            'https://tiab-badalona.cat/',
            'https://tiab-badalona.cat/membres-tiab/',
            'https://tiab-badalona.cat/formar-part-de-la-tiab/'
        ];
    }
    /** Metodo para scanear las url */
    Test.prototype.ScanUrls = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, element, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.urls;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        element = _a[_i];
                        return [4 /*yield*/, this.handleElement(element)];
                    case 2:
                        result = _b.sent();
                        // Compruebas que es tipo string identificando el tipo  
                        console.log(typeof result);
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** Metodo para manejar los elementos de los URLS
     * @param elem Elemento de la url
     * @returns Devuelve una promesa con el resultado del manejamiento.
     */
    Test.prototype.handleElement = function (element) {
        return __awaiter(this, void 0, void 0, function () {
            var chrome, options, runnerResult, repostJson, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        console.log(element);
                        return [4 /*yield*/, chromeLauncher.launch({ chromeFlags: ['--headless'] })];
                    case 1:
                        chrome = _a.sent();
                        options = { logLevel: 'info', output: 'html', onlyCategories: ['accessibility'], port: chrome.port };
                        return [4 /*yield*/, lighthouse(element, options)];
                    case 2:
                        runnerResult = _a.sent();
                        repostJson = runnerResult.report;
                        // Este string lo puedes guardar directamente en la base de datos mysql como string.
                        //   console.log(repostJson);
                        // Aqui lo estas transformando en html. Si lo vas a guardar directamente a la DB no es necesario
                        //  fs.writeFileSync('lhreport.html', repostJson);
                        // fs.writeFileSync('lhreport.html', reportHtml);
                        // `.lhr` is the Lighthouse Result as a JS object
                        console.log('Report is done for', runnerResult.lhr.finalUrl);
                        // console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);
                        return [4 /*yield*/, chrome.kill()];
                    case 3:
                        // console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);
                        _a.sent();
                        return [2 /*return*/, repostJson];
                    case 4:
                        err_1 = _a.sent();
                        console.log(err_1);
                        throw (err_1);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Test;
}());
exports.Test = Test;
/** Aqui empezamos la app */
var test = new Test();
test.ScanUrls();
