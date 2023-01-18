const AddBtn = document.querySelector('#Addbtn');
const InputBox = document.querySelector('.inputbox');
const aspan = document.querySelector('#aspan');
const Cityinput = document.querySelector('#Cityinput');
const Add = document.querySelector('#Add');
const Content = document.querySelector(".Content")

let GeographicLocation = JSON.parse(localStorage.getItem('Locations'))  || [];


const key = 'ce0227bf1465d8cfc1b69e68343e0ba8';


function Fetch() { 
    const GeoChordUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${Cityinput.value}&limit=1&appid=${key}`;
    fetch(GeoChordUrl)
    .then(res =>  res.json())
    .then(data => {
        GeographicLocation.push({
            lat1: lon = data[0].lon,
            lon1:  lat = data[0].lat ,
            city: data[0].name
        })
    localStorage.setItem('Locations', JSON.stringify(GeographicLocation));    
})

}



//==========================ADD Box==========================

//==========================ADD Box==========================

// GetRequest Loop
async function GetrequestLoop() {

    GeographicLocation.forEach((location) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat1}&lon=${location.lon1}&appid=${key}`)
        .then(res => res.json())
        .then(data => {
            let visibility = data.visibility;
            let Humidity = data.main.humidity;
            let Feelslike = data.main.feels_like - 273.15;
            let temp = data.main.temp - 273.15;
            let wthdesc = data.weather[0].description; 
            let wethIcon = data.weather[0].icon; 
            let city = location.city;
            console.log(wethIcon);

//===================RENDER FUNCTION=======================
Content.innerHTML += `
    <div class="Box WeatherCard">

        <header class="cardHeader">
            <div class="Wthnow"><img src="http://openweathermap.org/img/wn/${wethIcon}.png"  alt="sun" /></div>
            <div class="Cityinfo">
            <h2>${city}</h2>
            <span>Monday 01/17/2022</span>
            </div>
            </header>
                        
        <div class="WthCelsius">
            <div class="celsius">
            <h2>${Math.floor(temp)}</h2>
            <span>°C</span>
            </div>
            <div class="whetherinfo">${wthdesc}</div>
        </div>
                        
        <div class="wthinfo">
            <li><img src="./images/hum.svg" alt="hum" />Humidity<span>${Math.floor(Humidity)}</span></li>
             <li class="borderline"><img src="./images/wind.svg" alt="wind" />Feels like<span>${Math.floor(Feelslike)}</span></li>
            <li><img src="./images/visibility.svg" alt="hum" />Visibility<span>${Math.floor(visibility)}</span></li>
            <li class="borderline"><img src="./images/temp.svg" alt="wind" />temp<span>${Math.floor(temp)}</span></li>
        </div>
                        
    </div>   ` ;
//===================RENDER FUNCTION=======================
                                       
        })
    });
    
}

GetrequestLoop()
// GetRequest Loop


Add.addEventListener('click' , e => {
    e.preventDefault();
    if (Cityinput.value == '') {
        console.log('Insert City name');
    }else{
        Fetch();
    }
})


AddBtn.addEventListener('click' , () => {
    InputBox.style = 'display:block';
    AddBtn.style = 'display:none';
    aspan.style = 'display:none';
    console.log(e);
})

