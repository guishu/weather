const form = document.querySelector('form')
const search = document.querySelector('input')

const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

form.addEventListener('submit', (e) => {
    const location = search.value

    msg1.textContent = 'Loading...'

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            msg1.textContent = "";
            msg2.textContent = "";

            if(data.error) 
                return msg2.textContent = data.error

            msg1.textContent = data.forecast

            
        })
    })

    e.preventDefault()
})