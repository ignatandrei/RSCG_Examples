"use strict";
(async () => {
console.log(`start print`);
const { badgen } = require("badgen");
const sloc = require("node-sloc");
const fs = require("fs");
const chapters = [

	"ApplicationVersion",
	"Enum",
	"JsonToClass",
	"CopyConstructor",
	"DTOMapper",
	"SkinnyControllers",
	"DP_Builder",
	"MetadataFromObject",
	"DynamicMocking",
	"MethodDecorator",
	"PartiallyFunction"

];

for (var i = 0; i < chapters.length; i++) {
  var item = chapters[i];
  
}


var markdownpdf = require("markdown-pdf");

var mdDocs = [
	"1-break.md",
	"../book/about.md",
	"1-break.md",
	"../book/whatIs.md",
	"1-break.md",	
    "../ApplicationVersion/README.md",
	"1-break.md",
	"../Enum/README.md",
	"1-break.md",
	"../JsonToClass/README.md",
	"1-break.md",
	"../CopyConstructor/README.md",
	"1-break.md",
	"../DTOMapper/readme.md",
	"1-break.md",
	"../SkinnyControllers/README.md",
	"1-break.md",
	"../DP_Builder/readme.md",
	"1-break.md",
	"../MetadataFromObject/README.md",
	"1-break.md",
	"../DynamicMocking/readme.md",
	"1-break.md",
	"../MethodDecorator/README.md",
	"1-break.md",
	"../PartiallyFunction/readme.md",
	"1-break.md",
	"../IFormattable/readme.md",
	"1-break.md",
	"../DP_Decorator/README.md",
	"1-break.md",
	"../PropertyExpressionGenerator/readme.md",
	"1-break.md",
	"../book/others.md"
  ],
  bookPath = "../book-raw.pdf";

var options = {
  remarkable: {
      html: true,
      breaks: true
  },
  runningsPath: 'running.js'
}

function generateBook() {
  return new Promise(function(resolve, reject) {
    markdownpdf(options)
      .concat.from(mdDocs)
      .to(bookPath, function () {
        console.log("Created", bookPath);
        resolve(bookPath);
      });
  });
}
 

var bookPath = await generateBook();

const PDFMerger = require('pdf-merger-js');
var merger = new PDFMerger();

//merger.add("../cover.pdf"); 
merger.add("../book-raw.pdf");
await merger.save("../book.pdf"); 


})();