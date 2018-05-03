#!/usr/bin/node

/**
 *
 *  Lantube Node.js OFFLINE mode
 *
 *  - Project: https://github.com/andrrrl/lantube
 *  - Author: Andrrr <andresin@gmail.com>
 *  - This little tool let's you add videos to storage (locar or remote)
 *
 */

import * as util from 'util';
import * as readline from 'readline';
import * as colors from 'cli-color';
import * as request from 'request-promise';

import * as html5 from './htmlparser.class';
import * as libxml from 'libxmljs';


export class YTPlayer {

    private argv: string[] = [];
    private videoList: any[] = [];

    private appTitle = '▶ Lantube CLI';
    private horizontalDiv = '─';
    private verticalDiv = '│';
    private emptyDiv = ' ';

    private YOUTUBE_URL = 'https://www.youtube.com';
    private SERVER_URL = 'http://localhost:3000';
    private ADD_VIDEO = '/api/videos/add/:video';
    private PLAY_VIDEO = '/api/player/:id/play';

    constructor() { }

    init(argv) {

        this.argv = argv;

        console.log(colors.bold.yellow('             ╭──' + this.horizontalDiv.repeat(this.appTitle.length) + '──╮            '));
        console.log(colors.bold.yellow('»────────────┤  ' + this.appTitle + '  ├───────────➤'));
        console.log(colors.bold.yellow('             ╰──' + this.horizontalDiv.repeat(this.appTitle.length) + '──╯            '));

        if (this.argv.length === 3) {
            let term = this.argv[2];

            console.log(colors.red('  Searching videos for... ' + term));

            let options = {
                url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(term),
                json: false,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (X11; U; Linux i686) Gecko/20071127 Firefox/2.0.0.11'
                }
            }

            request(options)
                .then((body) => {

                    const html = libxml.parseHtmlString(body);
                    this.videoList = html.find('//a[@rel="spf-prefetch"]');

                    this.videoList.forEach((video, k) => {
                        console.log((k + 1) + ' ' + colors.green(video.text()) + ' ~ ' + this.YOUTUBE_URL + video.attr('href').value());
                    });

                    this.selectVideo(this.videoList.length);

                    // Usually combined with resolveWithFullResponse = true to check response.statusCode

                })
                .catch((err) => {
                    console.log(err);
                    // Request failed due to technical reasons...
                });



        } else {
            this.writeMessage(13, 2, 'yellow', 'bold', 'Expected at least 1 argument.');
        }

    }

    selectVideo(count: number) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(`Video (1-${count}): `, (answer) => {
            console.log(colors.red(`Playing ${answer} ...`));
            rl.close();

            this.playVideo(answer);

        });
    }

    playVideo(videoNumber) {

        console.log(this.videoList[videoNumber - 1].attr('href').value());

        const addVideo = {
            url: this.SERVER_URL + this.ADD_VIDEO.replace(':video', encodeURIComponent(this.YOUTUBE_URL + this.videoList[videoNumber - 1].attr('href').value())),
            json: true
        }

        request(addVideo).then((added) => {
            console.log('Added: ', added);
            if (added) {
                added = JSON.parse(added);
                const playVideo = {
                    url: this.SERVER_URL + this.PLAY_VIDEO.replace(':id', added._id),
                    json: true
                };
                request(playVideo).then((playing) => {
                    console.log('Starting playback...');
                });
            }
        });
    }

    writeMessage(margin, padding, color = 'yellow', weight = 'bold', messages) {

        // margin = ' '.repeat(margin);
        // padding = '─'.repeat(padding);

        // let header = margin + '╭' + padding + this.horizontalDiv.repeat(this.appTitle.length) + padding + '╮' + margin;
        // let title = margin + '┤' + padding + this.appTitle + '  ├' + padding + margin;
        // let empty = margin + '│' + padding + this.emptyDiv.repeat(this.appTitle.length) + padding + '│' + margin;

        // console.log(colors[color][weight](header));
        // console.log(colors[color][weight](title));
        // console.log(colors[color][weight](empty));
    }

}

