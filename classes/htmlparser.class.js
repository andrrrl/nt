"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const libxml = require("libxmljs");
class HTML5Parser {
    constructor() { }
    getList(html) {
        console.log('xmlDoc');
        const xmlDoc = libxml.parseXmlString(html);
        console.log('xmlDoc', xmlDoc.get('/ul'));
        // /a[@rel="spf-prefetch"]
        let gchild = xmlDoc.get('//*');
        return gchild;
    }
}
exports.HTML5Parser = HTML5Parser;
//# sourceMappingURL=htmlparser.class.js.map