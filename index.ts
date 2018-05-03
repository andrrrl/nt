import * as PlayerCtrl from './classes/ytplayer.class';

// let rootDir = '../../';
// require('dotenv').config({
//     path: rootDir + '.env'
// });

let player = new PlayerCtrl.YTPlayer();

player.init(process.argv);