/*invokes pylint on the given file creates a json file with the output*/

var exec = require('child_process').exec, child;
//runs command line
child = exec('pylint ./samplePython.py --output-format=json > testOutput.json',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });