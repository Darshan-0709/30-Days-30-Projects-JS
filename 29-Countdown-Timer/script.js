const displayTime = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const timeButtons = document.querySelectorAll('[data-time]');
const progressbar = document.querySelector('.progressbar')
console.log(progressbar)

let countdown;

function timer (seconds){

  clearInterval(countdown)
  
  const now = Date.now()
  const then = now + seconds * 1000
  let secondsLeft = Math.round((then - Date.now()) / 1000)
  endTime.textContent = displyEndTime(then)
  displayTime.textContent = displayTimeText(secondsLeft)
  
  countdown = setInterval(() => {
    secondsLeft = Math.round((then - Date.now()) / 1000)
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    width = (secondsLeft / seconds) * 100
    progressbar.style.width = width +'%'
    document.title = displayTimeText(secondsLeft)
    displayTime.textContent = displayTimeText(secondsLeft)
  }, 1000);
}

function displayTimeText(seconds){
  const minute = Math.floor(seconds / 60)
  const second = seconds % 60
  return `${minute}:${second < 10 ? "0" : ''}${second}`
}

function displyEndTime(time){
  const end = new Date(time)
  const hour = end.getHours()
  const modifidedHour = hour > 12 ? hour - 12 : hour
  const minute = end.getMinutes()
  return `Be back at ${modifidedHour < 10 ? "0" : ''}${modifidedHour}:${minute < 10 ? "0" : ''}${minute}`
}

document.customForm.addEventListener('submit', function(e){
  e.preventDefault()
  formMinutes = parseFloat(this.minutes.value) * 60
  if(formMinutes){
    timer(formMinutes )
    this.reset()
  }else{
    alert('Please enter minute in numeric value')
  }
  console.log(formMinutes)
})

timeButtons.forEach(button => {
  button.addEventListener('click', ()=> {
    const seconds = parseFloat(button.dataset.time)
    timer(seconds)
  })
})