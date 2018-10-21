# Opinion-Poll-SPA
**Single Page Application (SPA)** for taking an opinion survey, collect votes, calculate results and display them with **basic browser technology** following the "Use the platform" paradigm.

## Context
In a Web Engineering seminar, undergraduate students have to learn both web technology and scientific work. Students are not familiar with web technology, so they are doing their first steps building their own homepage. Therefore this project relies on basic browser technology only, trying to reduce the technology stack as far as possible. Therefore the technology stack is:
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
