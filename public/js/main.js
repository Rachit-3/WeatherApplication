const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name')
const temp_real_value = document.getElementById('temp_real_value');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer')
const day = document.getElementById('day')
const today_date = document.getElementById('today_date');

const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    console.log(cityVal);
    if(cityVal === ""){
        city_name.innerText = "Plz write the name before search";
        datahide.classList.add('data_hide');
    }
    else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=01d172126452df88dd452efceb004361`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            console.log(arrData)
            
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_value.innerText = `${(arrData[0].main.temp-273).toFixed(2)}`;
            console.log(arrData[0].main.temp-273)
            // console.log(response);
            const tempMood = arrData[0].weather[0].main;

            if(tempMood == "Clear") {
                temp_status.innerHTML = 
                    "<i class='fa-solid fa-sun' style='color: #eccc68;'></i>";
            }else if (tempMood == "clouds") {
                temp_status.innerHTML = 
                    "<i class='fa-solid fa-cloud' style='color: #f1f2f6;'></i>";
            }else if(tempMood == "Rain") {
                temp_status.innerHTML = 
                    "<i class='fa-solid fa-rain' style='color: #a4b0be;'></i>";
            }else {
                temp_status.innerHTML = 
                    "<i class='fa-solid fa-cloud' style='color: #f1f2f6;'></i>";
            }

            datahide.classList.remove('data_hide');
        }catch(error){
            console.log(error);
            city_name.innerText = `Plz enter the city name properly`;
            datahide.classList.add('data_hide');
        }
    }
}

const getCurrentDay = () => {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let currentTime = new Date();
    let day = weekday[currentTime.getDay()]
    return day;
};
day.innerText = getCurrentDay();

const getCurrentTime = () => {
    var now = new Date();
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var month = now.getMonth();
    var dayN = now.getDate();

    // console.log(${months[month]} ${dayN})
    return `${dayN} ${months[month]}`
};
today_date.innerText = getCurrentTime();

submitBtn.addEventListener('click', getInfo);