public with sharing class WeatherController {
    private static final String ADDRESS_API = 'https://api.openweathermap.org/data/2.5/weather?';
    private static final String APIKEY = 'eaa658163008096020f2a9c66256890e';
    //Метод для получения списка установленных городов по default
    @AuraEnabled
    public static List<Metadata__c> getMetadata() {
        List<Metadata__c> listMetadatas = [SELECT Id, Name, Sity_Name__c FROM Metadata__c];
        return listMetadatas;
    }
    //Метод получения данный с API
    @AuraEnabled
    public static String getWeatherInformation(String sityName) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(ADDRESS_API + sityName + '&units=metric&appid=' + APIKEY);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        return response.getBody();
    }
}