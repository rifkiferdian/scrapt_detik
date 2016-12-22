var request = require('request');
var cheerio = require('cheerio');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12',
  database : 'api_blog'
});


function scrapt(page){
	request('http://www.detik.com', function (error, response, html) {
	  if (!error && response.statusCode == 200) {
	    
	    var $ = cheerio.load(html);
	    
	    var berita = $('.desc_nhl a h2').map(function() {
		    var judul = $(this).html(); 
			return judul;
		}); 

		var tgl_post = $('.desc_nhl .labdate').map(function() {
		    var tgl = $(this).html().split(" | ");
		    return tgl[1];
		});

		for (var i = 0; i <= berita.length-1 ; i++) {	
	    	connection.query('INSERT INTO `scrapt`( `judul`, `tgl_post`) VALUES ("'+berita[i]+'","'+tgl_post[i]+'")', function(err, res) {
			  if (err) throw err;
			  	console.log('Last insert ID:', res.insertId);
			});
		}


	  }
	});
}


scrapt();
