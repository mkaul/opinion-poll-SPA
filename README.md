# Opinion-Poll-SPA
**Single Page Application (SPA)** for taking an opinion survey, collect votes, calculate results and display them with **basic browser technology** following the "Use the platform" paradigm.

## Preview
[mkaul.github.io/opinion-poll-SPA/](https://mkaul.github.io/opinion-poll-SPA/)

## SPA as Survey Tool
This SPA is used for a survey, to take the opinion poll, to calculate the results and to display them. All these functions are integrated into a single HTML page. No further tools are needed. Only a modern standard browser is necessary.

## Taking votes and measuring delays
The tool is not only taking votes, but also measuring delays: When the partcipants in the opinion poll have to choose between different options, they have to decide. The tool is also measuring, how long they take to decide between the options. 

## Context
This project is part of the work of students in an undergraduate seminar on Web Engineering. The curriculum also demands for educating scientific methods. So, in this Web Engineering seminar, undergraduate students have to learn both web technology and scientific work. Students are not familiar with web technology, so they are doing their first steps building their own homepage. Therefore this project relies on basic browser technology only, trying to reduce the technology stack as far as possible. Therefore the technology stack is:
* HTML
* CSS
* JavaScript

All these technologies are used in their most modern form:
* HTML5
* CSS3
* ECMAScript 2018 

In order to follow Software Engineering principles, a modular approach to JavaScript is taken. _ES6 import_ allows to modularizing JavaScript. Mocha Chai is used for modular testing in the browser, without the use of node.js and npm. 

The available server technology for storing votes is a student Debian LINUX server with SSH access. On the server only Apache HTTP and PHP are available, no database. Therefore PHP is used to store data in files in their own home storage. 

## Single Page Application (SPA) 
This simple Single Page Application (SPA) is intended to take opinion surveys, collect votes, calculate results and display them, all on one single page. The simplest approach is to write everything down on a single HTML page and to turn on and off the different parts via the HTML display attribute.
* display='none'
* display='block'

The SPA is built with basic browser technology only in order to reduce the technology stack.  

## Use the platform
The "Use the platform" paradigm invites web engineers to use the browser built-in features instead of using frameworks and deep technology stacks. 

## Installation
Go to the server running HTTP and PHP, on which you want to install this software and run git clone:
```bash
git clone https://github.com/mkaul/opinion-poll-SPA.git
```
Adapt the paths in the files `paper-agile.js` and `paper-agile.mjs` as follows:
* Write your name into the license div at the bottom of index.html
* Direct the fetch requests to your own server:
```javascript
1. fetch(new Request('https://your-server.info/folder/php/log_post.php')

2. const dataset = await (await fetch(new Request('https://your-server.info/folder/php/all_objects.php')
```

### Configuration of the logs directory

The Apache process running the HTTP server under the user-id "www-data" must have write access to the logs directory. 

Therefore the group should be "www-data":
* chgrp www-data logs

Grant the write access to the group:
* chmod 775 logs 
