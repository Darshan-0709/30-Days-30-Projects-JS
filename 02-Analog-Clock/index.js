const secondHand = document.querySelector('.secondHand');
const minuteHand = document.querySelector('.minuteHand');
const hourHand = document.querySelector('.hourHand');

function currentTime() {
    const date = new Date();

    let seconds = date.getSeconds();
    let secondsDeg = (seconds / 60) * 360 + 90;
    if(secondsDeg == 90) {
        // this if statement will prevent trasition for one second so that it did't transiton from 444deg to 90deg ;)
        secondHand.style.transitionDuration = '0s';
    }else {
        secondHand.style.transitionDuration = '500ms';
    }
    secondHand.style.transform = `rotate(${secondsDeg}deg)`

    let minutes = date.getMinutes();
    let minutesDeg = (minutes / 60) * 360 + 90;
    if(minutesDeg == 90) {
        minuteHand.style.transitionProperty = '0';
    }else {
        minuteHand.style.transitionDuration = '500ms';
    }
    minuteHand.style.transform = `rotate(${minutesDeg}deg)`
    
    let hours = date.getHours();
    let hoursDeg = (hours / 12) * 360 + 90;
    if(hoursDeg == 90) {
        hourHand.style.transitionProperty = '0';
    }else {
        hourHand.style.transitionDuration = '500ms';
    }
    hourHand.style.transform = `rotate(${hoursDeg}deg)`
    console.log(hoursDeg)


    console.log(seconds);
}

setInterval(currentTime, 1000);





