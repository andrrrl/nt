"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PlayerCtrl = require("./classes/ytplayer.class");
// let rootDir = '../../';
// require('dotenv').config({
//     path: rootDir + '.env'
// });
let player = new PlayerCtrl.YTPlayer();
player.init(process.argv);
//# sourceMappingURL=index.js.map