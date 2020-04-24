@isTest
global class WaetherControllerMock  implements HttpCalloutMock {
    global HTTPResponse respond(HTTPRequest request){
        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');
        response.setBody('{"weather": [{"id": 800, "main": "Clear", "description": "clear sky", "icon": "01n"}]}');
        response.setStatusCode(200);
        return response;
    }
}