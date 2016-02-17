/*
 / => uitleg over de calculator met response code 200 en plain/text als header type.
 /add/2/3 => 5 als output, dus optellen van de eerste en de tweede operand, response code 200 en plain/text als type
 /sub/4.5/1.2 =>3.3 dus aftrekken
 /mul/op1/op2 => op1*op2
 /div/op1/op2 => op1/op2
 Elke andere URL moet een nette foutmelding geven met HTTP response code 404
 */

var http = require('http');
var url = require('url');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {

    var pattern = /^\/(add|sub|mul|div)\/[0-9]+(\.|,)?[0-9]*\/[0-9]+(\.|,)?[0-9]*$/;
    var requestUrl = url.parse(request.url);
    var requestPath = requestUrl.path;
    if (requestPath == "/"){
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.end("" +
            "Dit is een rekenmachine.\n\n" +
            "De functies kunnen aangeroepen worden bij naam en twee paramters\n" +
            "Bijvoorbeeld: add/2/3\n\n" +
            "De volgende functies worden ondersteund:\n" +
            "add - Voor het optellen van twee parameters met getallen\n" +
            "sub - Voor het aftrekken van twee parameters met getallen\n" +
            "mul - Voor het vermenigvuldigen van twee parameters met getallen\n" +
            "div - Voor het delen van twee parameters met getallen\n"
        );
    }
    else if(!requestPath.match(pattern)){
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.end("De opgegeven parameters zijn onjuist.");
    }
    else{
        var action = requestPath.split('/').slice(1)[0];
        var param1 = parseFloat(requestPath.split('/').slice(1)[1].replace(',','.'));
        var param2 = parseFloat(requestPath.split('/').slice(1)[2].replace(',','.'));

        response.writeHead(200, {"Content-Type": "text/plain"});

        switch(action) {
            case 'add':
                response.end((param1 + param2).toString());
                break;
            case 'sub':
                response.end((param1 - param2).toString());
                break;
            case 'mul':
                response.end((param1 * param2).toString());
                break;
            case 'div':
                response.end((param1 / param2).toString());
        }
    }
});
server.listen(8080);
