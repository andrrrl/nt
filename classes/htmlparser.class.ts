import * as libxml from 'libxmljs';

export class HTML5Parser {

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