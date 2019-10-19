console.log('Client side js file loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() 
    const url = '/weather?address=' + search.value

    messageOne.textContent = 'Loading...'
    fetch(url,{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        }).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.address
                messageTwo.textContent = data.forecastData
            }
        })
    })
})
