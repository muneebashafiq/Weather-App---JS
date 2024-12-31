const APIKey="2d4eb6a9c30424daae79b51b5e1db288";
const APIURL="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

searchBox=document.querySelector(".search-box input");
searchBtn=document.querySelector(".search-box button");
weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response= await fetch(APIURL + city +`&appid=${APIKey}`);
    var data = await response.json();
    console.log(response)
    console.log(data)
    if(response.status==404){
        document.querySelector(".error").style.display="block";
    }

    else
    {
        document.querySelector(".city-name").innerHTML=data.name + " , " + data.sys.country;
        document.querySelector(".temp").innerHTML=data.main.temp + "&deg;C";
        document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
        document.querySelector(".wind").innerHTML=data.wind.speed + " km/h";
        console.log(data)
        console.log(data.timezone)
        console.log(data.weather[0].main)
        if(data.weather[0].main=="Haze"){
            weatherIcon.src="images/drizzle.png";
        }

        else if(data.weather[0].main=="Clear")
        {
            weatherIcon.src="images/clear.png";
        }

        else if(data.weather[0].main=="Clouds")
        {
            weatherIcon.src="images/clouds.png";
        }

        else if(data.weather[0].main=="Mist")
        {
            weatherIcon.src="images/mist.png";
        }

        else if(data.weather[0].main=="Rain")
        {
            weatherIcon.src="images/rain.png";
        }

        else if(data.weather[0].main=="Snow")
        {
            weatherIcon.src="images/snow.png";
        }

        document.querySelector(".weather").style.display="block";
        document.querySelector(".error").style.display="none";
        }
    
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(searchBox.value);
})


