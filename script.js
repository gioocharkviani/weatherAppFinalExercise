const AddBtn = document.querySelector('#Addbtn');
const InputBox = document.querySelector('.inputbox');
const aspan = document.querySelector('#aspan');
const Cityinput = document.querySelector('#Cityinput');
const Add = document.querySelector('#Add');



AddBtn.addEventListener('click' , e => {
    InputBox.style = 'display:block';
    AddBtn.style = 'display:none';
    aspan.style = 'display:none';
})


function Fetch() { 
    const key = 'ce0227bf1465d8cfc1b69e68343e0ba8';
    const GeoChordUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${Cityinput.value}&limit=1&appid=${key}`;
    fetch(GeoChordUrl)
    .then(res =>  res.json())
    .then(data => {
        
        for(let GeoLoc in data){
            let location = data[GeoLoc]
            console.log(location);
        }
        
})

}


Add.addEventListener('click' , e => {
    e.preventDefault();
    if (Cityinput.value == '') {
        console.log('Insert City name');
    }else{
        Fetch();
    }
})
