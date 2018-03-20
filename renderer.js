// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var fs = require('fs');
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

submitBtn.addEventListener('click', function(){
	console.log('Testing');
	var folderName = document.getElementById('myFile').value;
	// folderName = '/home/ubuntu/workspace/kartik';
	console.log(getFiles(folderName));
});

