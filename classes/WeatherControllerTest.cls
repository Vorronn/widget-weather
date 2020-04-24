@isTest
private class WeatherControllerTest {
    @isTest
    static void testWeatherComponent(){
        Test.setMock(HttpCalloutMock.class, new WaetherControllerMock());
        String result = WeatherController.getWeatherInformation('London');
        System.assertNotEquals(null, result, 'The callout retutned a null');
    }
    
    @isTest
    static void testMetadata() {
        Metadata__c test = new Metadata__c(Name='test');
        insert test;
        WeatherController.getMetadata();
        System.assertEquals(1, [SELECT count() FROM Metadata__c]);
    }
}