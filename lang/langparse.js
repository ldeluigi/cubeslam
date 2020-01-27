/*jshint node: true */
const fs = require('fs')
const { JSDOM } = require('jsdom');

var files = process.argv.slice(2);
var pending = files.length;

var result = {
  '@@locale': 'en-US',
  '@@context': 'Cube Slam'
};

files.forEach(function(file){
	const jsdom = new JSDOM(fs.readFileSync(file, 'utf8'));
	const { window } = jsdom;
	const { document } = window;
	global.window = window;
	global.document = document;

	const $ = global.jQuery = require('../jquery/jquery.js');
	$('*').filter(function() { return $(this).attr('arb:id'); }).each(function() {
          result[$(this).attr('arb:id')] = $(this).html() || $(this).attr('content');
    });
})
done();

function done(){
  process.stdout.write('arb.register(\'cubeslam:en-US\',');
  process.stdout.write(JSON.stringify(result,null,2));
  process.stdout.write(');\n');
}
