const AddBtn = document.querySelector('#Addbtn');
const InputBox = document.querySelector('.inputbox');
const aspan = document.querySelector('#aspan');
const Cityinput = document.querySelector('#Cityinput');
const Add = document.querySelector('#Add');
const Content = document.querySelector(".Content")
const Addbox = document.querySelector(".Addbox")




//==================week days =============
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const newdate = new Date();
let day = weekday[newdate.getDay()];
//==================week days =============

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



// GetRequest Loop
function GetrequestLoop() {

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

//===================RENDER FUNCTION=======================

let CreatBox = document.createElement('div');
CreatBox.setAttribute('class' , 'Box WeatherCard');
CreatBox.setAttribute('id' , city);
Content.appendChild(CreatBox);


CreatBox.innerHTML = `

<div class="removecard">
<button id="removecard" data-action="remove" onclick="removeFunction()"><img src="./images/remove.svg" /></button>
</div>

<header class="cardHeader">
<div class="Wthnow"><img src="http://openweathermap.org/img/wn/${wethIcon}.png"  alt="sun" /></div>
<div class="Cityinfo">
<h2>${city}</h2>
<span>${day}</span>
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
`
//===================RENDER FUNCTION=======================                                     
        })
        
    });
    
}

GetrequestLoop()


Add.addEventListener('click' , e => {
    e.preventDefault();
    if (Cityinput.value == '') {
        alert('Insert City name');
    }else{
        Fetch();
        setTimeout(() => {
            GetrequestLoop();
            location.reload();
          }, 1000)
          
    }
})


AddBtn.addEventListener('click' , () => {
    InputBox.style = 'display:block';
    AddBtn.style = 'display:none';
    aspan.style = 'display:none';
})


function removeFunction(city){
    let temp = GeographicLocation.filter(location => location.city != city)
    localStorage.setItem('Locations', JSON.stringify(GeographicLocation));
}

Content.addEventListener('click', (event) => {
    const target = event.target;
    const ParentElement = target.parentNode;

    const task = ParentElement;
    const taskId = Number(task.id);

    console.log(target);
})
