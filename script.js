const APIKey="2d4eb6a9c30424daae79b51b5e1db288";
const APIURL="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

inputcity=document.querySelector('.input')
searchbtn=document.querySelector('.search-btn')

modeChange=document.querySelector('.slider')
modeChange.addEventListener('click',()=>{
        if(document.querySelector('.slider').style.justifyContent=='flex-start')
        {
                // SLIDER 
                document.querySelector('.slider').style.justifyContent='flex-end' 
                document.querySelector('.mode-text').innerHTML="Dark Mode"
                const bodyClass=document.querySelector('.body-light')
                bodyClass.classList.remove('body-light')
                bodyClass.classList.add('body')

                document.querySelector('.location p').style.color=null

                // INPUT BAR
                document.querySelector('.search-bar').style.background=null
                document.querySelector('.search-bar').style.border=null
                document.querySelector('.search-bar input').style.color=null
                document.querySelector('.search-bar button').style.color=null

                // BOXES
                document.querySelector('.loc-time').style.background=null

                document.querySelector('.weather-details').style.background=null

                document.querySelector('.forecast').style.background=null

                document.querySelector('.hourly-forecast').style.background=null

                document.querySelector('.temperature div p').style.color=null
                document.querySelector('.temperature div .feels').style.color=null

                const list=document.querySelectorAll('.hourly-forecast .hours div')
                for (let i = 0; i < list.length; i++) {
                        list[i].style.background=null
                } 
                
                document.querySelector('.sunrise img').classList.remove('dark-icon')
                document.querySelector('.sunset img').classList.remove('dark-icon')

                const imgIcon=document.querySelectorAll('.extra-details img')
                for (let i=0 ; i<imgIcon.length; i++)
                        {
                                imgIcon[i].classList.remove('dark-icon')     
                        }
       
        }

        else
        {
                // SLIDER 
                document.querySelector('.slider').style.justifyContent='flex-start'
                document.querySelector('.mode-text').innerHTML="Light Mode"
                const bodyClass=document.querySelector('.body')
                bodyClass.classList.remove('body')
                bodyClass.classList.add('body-light')
                document.querySelector('.slider').style.border='1px solid #111'

                document.querySelector('.location p').style.color="white"

                // INPUT BAR
                document.querySelector('.search-bar').style.background='#D9D9D9'
                document.querySelector('.search-bar').style.border='1px solid #111'
                document.querySelector('.search-bar input').style.color='#444444'
                document.querySelector('.search-bar button').style.color='#5b5b5b'


                // BOXES
                document.querySelector('.loc-time').style.background='#D9D9D9'
                document.querySelector('.temperature div p').style.color='#444444'
                document.querySelector('.temperature div .feels').style.color='#444444'
                document.querySelector('.weather-details').style.background='#D9D9D9'

                document.querySelector('.forecast').style.background='#D9D9D9'

                document.querySelector('.hourly-forecast').style.background='#D9D9D9'

                const list=document.querySelectorAll('.hourly-forecast .hours div')
                for (let i = 0; i < list.length; i++) {
                        list[i].style.background='rgb(197,197,197)'
                } 
                
                document.querySelector('.sunrise img').classList.add('dark-icon')
                document.querySelector('.sunset img').classList.add('dark-icon')

                const imgIcon=document.querySelectorAll('.extra-details img')
                for (let i=0 ; i<imgIcon.length; i++)
                        {
                                imgIcon[i].classList.add('dark-icon')     
                        }
        }
})

function weathIcon(inputVariable, outputVariable){
        if(inputVariable=="Haze"){
                outputVariable.src="images/drizzle.png";
            }
        
            else if(inputVariable=="Clear")
            {
                outputVariable.src="images/clear.png";
            }
        
            else if(inputVariable=="Clouds")
            {
                outputVariable.src="images/clouds.png";
            }
        
            else if(inputVariable=="Mist")
            {
                outputVariable.src="images/mist.png";
            }
        
            else if(inputVariable=="Rain")
            {
                outputVariable.src="images/rain.png";
            }
        
            else if(outputVariable=="Snow")
            {
                outputVariable.src="images/snow.png";
            }
}

var finalLoc;
async function runWeatheer(city)
{
        const response = await fetch(APIURL + city + `&appid=${APIKey}`)
        var data = await response.json()
        document.querySelector('main').style.display ='flex'
    console.log(data)

            // NAME 
    document.querySelector('.loc').innerHTML=data.name +", " + data.sys.country
    const timestamp = data.dt 
    const date = new Date(timestamp * 1000); 
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
    let time = date.toLocaleTimeString('en-US', optionsTime);
    time = time.replace(/(:\d{2})\s*[AP]M/i, '$1');
    console.log(time); 

            // TIME 
    document.querySelector('.main-time').innerHTML=time

    const optionsDay = { weekday: 'long', day: 'numeric', month: 'long' };
    const formattedDate = new Intl.DateTimeFormat('en-US', optionsDay).format(date);
    console.log(formattedDate); 

            // DAY
    document.querySelector('.main-date').innerHTML=formattedDate

            // TEMPERATURE
    console.log(data.main.temp)
    document.querySelector('.temp').innerHTML=Math.round(data.main.temp) + `&deg;C`

            // FEELS LIKE 
    console.log(data.main.feels_like)
    document.querySelector('.feels').innerHTML=Math.round(data.main.feels_like) + `&deg;C`

            // SUN RISE 
    const sunriseTimestamp=data.sys.sunrise
    const sunrise=new Date(sunriseTimestamp * 1000)
    const optionSunrise={hour:'2-digit', minute:'2-digit'}
    let sunriseTime=sunrise.toLocaleTimeString('en-US',optionSunrise)
    console.log(sunriseTime)

    document.querySelector('.sunrise .time').innerHTML=sunriseTime

            // SUN SET 
    const sunsetTimestamp=data.sys.sunset
    const sunset=new Date(sunsetTimestamp * 1000)
    const optionSunset={hour:'2-digit', minute:'2-digit'}
    let sunsetTime=sunset.toLocaleTimeString('en-US',optionSunset)
    console.log(sunsetTime)

    document.querySelector('.sunset .time').innerHTML=sunsetTime

        // WEATHER CONDITION
    console.log(data.weather[0].main)
    document.querySelector('.weather-condition').innerHTML=data.weather[0].main

            // WEATHER ICON
    const finalLoc= document.querySelector('.weather-icon')
    source=data.weather[0].main
    weathIcon(source, finalLoc)


            //  HUMIDITY
    console.log(data.main.humidity)
    document.querySelector('.humidity').innerHTML=data.main.humidity +"%"

            //  WINDS SPEED
    const windSpeed=data.wind.speed
    const wind = Math.round(windSpeed * 10) / 10;
    console.log(wind)
    document.querySelector('.wind').innerHTML=wind+"km/h"
    

            //PRESSURE
    console.log(data.main.pressure)
    document.querySelector('.pressure').innerHTML=data.main.pressure + "hpa"
    
            //UV

    const lat = data.coord.lat 
    const lon = data.coord.lon 
    console.log(lat)
    console.log(lon)

                // 5 DAYS FORECAS
    const apiforecasturl=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`

    async function WeatherForecast(){
        const response = await fetch(apiforecasturl)
        var data = await response.json()
        console.log(data)

        // DAY 1
        // DAY
        const timestamp1 = data.list[3].dt
        const date1 = new Date(timestamp1 * 1000); 
        const optionsDay1 = { weekday: 'long', day: 'numeric', month: 'long' };
        const formattedDate1 = new Intl.DateTimeFormat('en-US', optionsDay1).format(date1);
        console.log(formattedDate1); 
        document.querySelector('.date1').innerHTML=formattedDate1

        // ICON 
        const finalLoc1=document.querySelector('.forecast-icon1')
        const source1 =data.list[3].weather[0].main
        weathIcon(source1, finalLoc1)

        // TEMPERATURE
        console.log(data.list[3].main.temp)
        document.querySelector('.temp1').innerHTML=Math.round(data.list[1].main.temp) + `&deg;C`

        // DAY 2
        // DAY
        const timestamp2 = data.list[10].dt
        const date2 = new Date(timestamp2 * 1000); 
        const optionsDay2 = { weekday: 'long', day: 'numeric', month: 'long' };
        const formattedDate2 = new Intl.DateTimeFormat('en-US', optionsDay2).format(date2);
        console.log(formattedDate2); 
        document.querySelector('.date2').innerHTML=formattedDate2

        // ICON 
        const finalLoc2=document.querySelector('.forecast-icon2')
        const source2 =data.list[10].weather[0].main
        weathIcon(source2, finalLoc2)

         // TEMPERATURE
         console.log(data.list[10].main.temp)
         document.querySelector('.temp2').innerHTML=Math.round(data.list[10].main.temp) + `&deg;C`

        // DAY 3
        // DAY
        const timestamp3 = data.list[18].dt
        const date3 = new Date(timestamp3 * 1000); 
        const optionsDay3 = { weekday: 'long', day: 'numeric', month: 'long' };
        const formattedDate3 = new Intl.DateTimeFormat('en-US', optionsDay3).format(date3);
        console.log(formattedDate3); 
        document.querySelector('.date3').innerHTML=formattedDate3

        // ICON 
        const finalLoc3=document.querySelector('.forecast-icon3')
        const source3 =data.list[18].weather[0].main
        weathIcon(source3, finalLoc3)

         // TEMPERATURE
         console.log(data.list[18].main.temp)
         document.querySelector('.temp3').innerHTML=Math.round(data.list[18].main.temp) + `&deg;C`

        // DAY 4
        // DAY
        const timestamp4 = data.list[26].dt
        const date4 = new Date(timestamp4 * 1000); 
        const optionsDay4 = { weekday: 'long', day: 'numeric', month: 'long' };
        const formattedDate4 = new Intl.DateTimeFormat('en-US', optionsDay4).format(date4);
        console.log(formattedDate4); 
        document.querySelector('.date4').innerHTML=formattedDate4

        // ICON 
        const finalLoc4=document.querySelector('.forecast-icon4')
        const source4 =data.list[26].weather[0].main
        weathIcon(source4, finalLoc4)

         // TEMPERATURE
         console.log(data.list[26].main.temp)
         document.querySelector('.temp4').innerHTML=Math.round(data.list[26].main.temp) + `&deg;C`

        // DAY 5
        // DAY
        const timestamp5 = data.list[34].dt
        const date5 = new Date(timestamp5 * 1000); 
        const optionsDay5 = { weekday: 'long', day: 'numeric', month: 'long' };
        const formattedDate5 = new Intl.DateTimeFormat('en-US', optionsDay5).format(date5);
        console.log(formattedDate5); 
        document.querySelector('.date5').innerHTML=formattedDate5

        // ICON 
        const finalLoc5=document.querySelector('.forecast-icon5')
        const source5 =data.list[34].weather[0].main
        weathIcon(source5, finalLoc5)

         // TEMPERATURE
         console.log(data.list[34].main.temp)
         document.querySelector('.temp5').innerHTML=Math.round(data.list[34].main.temp) + `&deg;C`

        // *******************************************hourly forecast********************************

        // Hour 1------------------------------------------------------------------------------------
         // TEMPERATURE
         console.log(data.list[0].main.temp)
         document.querySelector('.fr1 .fr-temp').innerHTML=Math.round(data.list[0].main.temp) + `&deg;C`

         // TIME 
         const timestamp21 = data.list[0].dt 
         const date21 = new Date(timestamp21 * 1000); 
         const optionsTime21 = { hour: '2-digit', minute: '2-digit', hour12: false };
         let time21 = date21.toLocaleTimeString('en-US', optionsTime21);
         time21 = time21.replace(/(:\d{2})\s*[AP]M/i, '$1');
         console.log(time21); 
         document.querySelector('.fr1 .fr-time').innerHTML=time21

           //  WINDS SPEED
        const windSpeed21=data.list[0].wind.speed
        const wind21 = Math.round(windSpeed21 * 10) / 10;
        console.log(wind21)
        document.querySelector('.fr1 .fr-wind').innerHTML=wind21+"km/h"

        // ICON 
        const finalLoc21=document.querySelector('.fr1 .weather-cond-icon')
        const source21 =data.list[0].weather[0].main
        weathIcon(source21, finalLoc21)

        // Hour 2------------------------------------------------------------------------------------
         // TEMPERATURE
         console.log(data.list[1].main.temp)
         document.querySelector('.fr2 .fr-temp').innerHTML=Math.round(data.list[1].main.temp) + `&deg;C`

         // TIME 
         const timestamp22 = data.list[1].dt 
         const date22 = new Date(timestamp22 * 1000); 
         const optionsTime22 = { hour: '2-digit', minute: '2-digit', hour12: false };
         let time22 = date22.toLocaleTimeString('en-US', optionsTime22);
         time22 = time22.replace(/(:\d{2})\s*[AP]M/i, '$1');
         console.log(time22); 
         document.querySelector('.fr2 .fr-time').innerHTML=time22

           //  WINDS SPEED
        const windSpeed22=data.list[1].wind.speed
        const wind22 = Math.round(windSpeed22 * 10) / 10;
        console.log(wind22)
        document.querySelector('.fr2 .fr-wind').innerHTML=wind22+"km/h"

        // ICON 
        const finalLoc22=document.querySelector('.fr2 .weather-cond-icon')
        const source22 =data.list[1].weather[0].main
        weathIcon(source22, finalLoc22)
        

        // Hour 3------------------------------------------------------------------------------------
         // TEMPERATURE
         console.log(data.list[2].main.temp)
         document.querySelector('.fr3 .fr-temp').innerHTML=Math.round(data.list[2].main.temp) + `&deg;C`

         // TIME 
         const timestamp23 = data.list[2].dt 
         const date23 = new Date(timestamp23 * 1000); 
         const optionsTime23 = { hour: '2-digit', minute: '2-digit', hour12: false };
         let time23 = date23.toLocaleTimeString('en-US', optionsTime23);
         time23 = time23.replace(/(:\d{2})\s*[AP]M/i, '$1');
         console.log(time23); 
         document.querySelector('.fr3 .fr-time').innerHTML=time23

           //  WINDS SPEED
        const windSpeed23=data.list[2].wind.speed
        const wind23 = Math.round(windSpeed23 * 10) / 10;
        console.log(wind23)
        document.querySelector('.fr3 .fr-wind').innerHTML=wind23+"km/h"

        // ICON 
        const finalLoc23=document.querySelector('.fr3 .weather-cond-icon')
        const source23 =data.list[2].weather[0].main
        weathIcon(source23, finalLoc23)
        

        // Hour 4------------------------------------------------------------------------------------
         // TEMPERATURE
         console.log(data.list[3].main.temp)
         document.querySelector('.fr4 .fr-temp').innerHTML=Math.round(data.list[3].main.temp) + `&deg;C`

         // TIME 
         const timestamp24 = data.list[3].dt 
         const date24 = new Date(timestamp24 * 1000); 
         const optionsTime24 = { hour: '2-digit', minute: '2-digit', hour12: false };
         let time24 = date24.toLocaleTimeString('en-US', optionsTime24);
         time24 = time24.replace(/(:\d{2})\s*[AP]M/i, '$1');
         console.log(time24); 
         document.querySelector('.fr4 .fr-time').innerHTML=time24

           //  WINDS SPEED
        const windSpeed24=data.list[3].wind.speed
        const wind24= Math.round(windSpeed24 * 10) / 10;
        console.log(wind24)
        document.querySelector('.fr4 .fr-wind').innerHTML=wind24+"km/h"

        // ICON 
        const finalLoc24=document.querySelector('.fr4 .weather-cond-icon')
        const source24 =data.list[3].weather[0].main
        weathIcon(source24, finalLoc24)
        

        // Hour 5------------------------------------------------------------------------------------
         // TEMPERATURE
         console.log(data.list[4].main.temp)
         document.querySelector('.fr5 .fr-temp').innerHTML=Math.round(data.list[4].main.temp) + `&deg;C`

         // TIME 
         const timestamp25 = data.list[1].dt 
         const date25 = new Date(timestamp21 * 1000); 
         const optionsTime25 = { hour: '2-digit', minute: '2-digit', hour12: false };
         let time25 = date22.toLocaleTimeString('en-US', optionsTime25);
         time25 = time25.replace(/(:\d{2})\s*[AP]M/i, '$1');
         console.log(time25); 
         document.querySelector('.fr5 .fr-time').innerHTML=time25

           //  WINDS SPEED
        const windSpeed25=data.list[4].wind.speed
        const wind25 = Math.round(windSpeed25 * 10) / 10;
        console.log(wind25)
        document.querySelector('.fr5 .fr-wind').innerHTML=wind25+"km/h"

        // ICON 
        const finalLoc25=document.querySelector('.fr5 .weather-cond-icon')
        const source25 =data.list[4].weather[0].main
        weathIcon(source25, finalLoc25)

    }

    WeatherForecast()

}

searchbtn.addEventListener('click', ()=>{
        runWeatheer(inputcity.value)
})