console.log('ciao');


document.getElementById('btn').addEventListener('click', weather)


function weather(e){
    const address = document.getElementById('input').value

    fetch(`http://localhost:3000/api?address=${address}`).
    then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
        }
        else{
            console.log(data.address)
            console.log(data.forecast)
        }
        
    })
})
e.preventDefault()
}


