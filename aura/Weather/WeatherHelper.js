({
    getWeatherAPI : function(component, helper) {
        let sityNameAttribute = component.get("v.nameSity");	//Получение значения из строки поиска Weather.cmp
        let lat = component.get("v.latitude");					//Получение значения широты из Weather.cmp
        let lot = component.get("v.longitude");					//Получение значения долготы из Weather.cmp
        let nameDefault = component.get("v.nameSityMetada[0].Sity_Name__c");
        let action = component.get("c.getWeatherInformation");	//Получение компонента из WeatherController.apxc
        //Устанавливаем значение входящего параметра в методе c.getWeatherInformation
        action.setParams({
            "sityName" : sityNameAttribute ? "q=" + sityNameAttribute : (lat && lot) ? "lat=" + lat + "&lon=" + lot : "q="+ nameDefault
        });
        //Установка и получение значений с функции обратного вызова
		action.setCallback(this, function(response) {
			let data = JSON.parse(response.getReturnValue());
            let state = response.getState();
            //Установка значений атрибутов компонента с помощью значений, возвращаемых API вызовом
            if (data.cod==200) {
                component.set("v.currentWeather", data);
                //Получение URL иконок погоды
                let urlIcon = "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";
                component.set("v.iconURL", urlIcon)
            }
            else {
                alert('There is no such city in the database');
            }
        });
        //Ставим в очередь запрос к серверу
        $A.enqueueAction(action);
    }
}