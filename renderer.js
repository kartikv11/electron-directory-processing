// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var fs = require('fs');
const exiftool = require('node-exiftool');
const ep = new exiftool.ExiftoolProcess();

var submitButton = document.getElementById('submitBtn');

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

function processFile(file) {
	const rs = fs.createReadStream(file);
	return ep.open()
	.then(
		function() {
		    ep.readMetadata(rs, ['-File:all']);
		};
	).then(
		function(res) {
			console.log(res);
		};
	);
}

function processFiles(files_) {
	for (var i in files_){
		console.log(files_[i]);
        processFile(files_[i]);
    }
}

submitBtn.addEventListener('click', function(){
	var folderName = document.getElementById('myFile').value;
	folderName = '/home/ubuntu/workspace/kartik';
	var fileList = getFiles(folderName);
	// console.log(fileList);
	processFiles(fileList);
});

