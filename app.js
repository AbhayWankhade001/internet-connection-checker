const Popups = document.querySelector('.popups');
const WifiIcon = document.querySelector('.icon i');
const popupsTit = document.querySelector('.popups .tit');
const PopupsDesc = document.querySelector('.decs');
const Reconnect = document.querySelector('.reconnect');
 

let isOnline =true, intervalId, timer = 10;


const checkConnection = async () =>{
    try{
        //try to fetch random data from the api .if the status code is betwwen
        //200 and 300 the network connection is consider online
const response = await fetch ("https://jsonplaceholder.typicode.com/posts");
isOnline = response.status >= 200 && response.status<300;
console.log(response)
    }catch (error) {
        console.log(error);
        isOnline = false;
    }
    timer=10;
    clearInterval(intervalId);
    handelpopups(isOnline);

}

const handelpopups = (status) =>{
    if(status){
        WifiIcon.className = "ri-wifi-fill";
        popupsTit.innerText ="Restored conncetion";
        PopupsDesc.innerHTML="your desvice is now successfully connceted to the internet.";
        Popups.classList.add("online");
        return setTimeout(() => Popups.classList.remove("show"), 2000);
    }
    WifiIcon.className = "ri-wifi-off-fill";
    popupsTit.innerText ="lost conncetion";
    PopupsDesc.innerHTML="your network is unavaliable. we will attempt to reconncect  you in <b>10</b> sec"
    Popups.className ="popups show";

intervalId = setInterval(()=>{
timer--;
if(timer === 0) checkConnection();
    Popups.querySelector('.decs b').innerHTML=timer;
},1000)

}


//check the connection status  every second
setInterval(()=> isOnline && checkConnection(), 3000);
Reconnect.addEventListener("click", checkConnection);