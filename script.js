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
            lat1: data[0].lon,
            lon1: data[0].lat ,
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
CreatBox.setAttribute('id' , location.lat1);
Content.appendChild(CreatBox);


CreatBox.innerHTML = `

<div class="removecard">
<button class="removecardbtn" id="${location.lat1}" data-action="remove" ></button>
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



Content.addEventListener('click', (event) => {
    let remobebtn = document.querySelector('.removecardbtn');
    let WeatherCard = document.querySelector('.WeatherCard');
    const target = event.target;
    const ParentElement = target.parentNode;


    //Task id

    const box = ParentElement.id;
    const BoxId = box.id;


    //A C T I O N
    const actions = target.dataset.action;
    actions === "remove" && RemoveCard(BoxId) ;


    function RemoveCard(BoxId) {
        location.reload();
        GeographicLocation = GeographicLocation.filter((box , index) => index , BoxId);
        localStorage.setItem('Locations', JSON.stringify(GeographicLocation));   

    }


})

