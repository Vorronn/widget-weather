({
    doInit : function(component, event, helper){

		var utcDate = new Date();			//получение текущей даты
        var msec = Date.parse(utcDate);		//преобразование текущей даты в мс
        component.set("v.dateTime", msec);	//установка значений даты

        let action = component.get("c.getMetadata"); 			//Получение данный из WeatherController.apxc
        action.setCallback(this, function(response){
            let metadataObject = response.getReturnValue();
            component.set("v.nameSityMetada", metadataObject);	//Установка значения в Weather.cmp
            helper.getWeatherAPI(component);					//Вызов HELPER
        });
        $A.enqueueAction(action);
    },
    //Нажатие кнопки поиска по городу
    searchHandler: function(component, event, helper){
        helper.getWeatherAPI(component);
        component.set("v.nameSity","");
    },
    //Нажатие кнопки геолокации
    geolocation : function(component, event, helper){
        component.set("v.nameSity","");	//Обнуление строки поиска
        //Получение координат для запроса и вызов HELPER
        navigator.geolocation.getCurrentPosition(
            function(position){
                component.set("v.latitude", position.coords.latitude);
                component.set("v.longitude", position.coords.longitude);
                helper.getWeatherAPI(component);
            }
        )
        helper.getWeatherAPI(component);	//Вызываю второй раз так как почему то не обновляется зачение на странице нужно фиксить
    }
})