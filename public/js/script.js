document.getElementById('btn').addEventListener('click', weather)


function weather(e){
    const address = document.getElementById('input').value

    fetch(`http://localhost:3000/api?address=${address}`).
    then((response) => {
    response.json().then((data) => {
        if(data.error){
            document.querySelector('.msg1').innerText = data.error
            document.querySelector('.msg2').innerText = ''
        }
        else{
            document.querySelector('.msg1').innerText = data.address
            document.querySelector('.msg2').innerText = data.forecast
        }
        
    })
})
e.preventDefault()
}


