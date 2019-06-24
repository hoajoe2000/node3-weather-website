console.log("Client side javascript file is loaded")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne =  document.querySelector('#message-1')
const messageTwo =  document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.innerHTML = 'Loading...'
    messageTwo.innerHTML = ''
    const location = search.value
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.innerHTML = data.error
                console.log(data.error)
            } else {
               messageOne.innerHTML = `Location: ${data.location}`;
               messageTwo.innerHTML = `Forecast: ${data.forecast}
               <br>Temperature: ${data.temperature} &#8451`; 
            }
        })
    })
})