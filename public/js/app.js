console.log("client side js code is loaded ")

//calling fetch is javascript will kick off an asynchronous operation just like node did.
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })  
})



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
//query selector will match the first element in DOM
const messageOne = document.querySelector("#error")
const messageTwo = document.querySelector("#success")

weatherForm.addEventListener('submit', (event) => {
    //prevents the default reload of page which refreshes the page immediately when form renders
    event.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
      
        })
    })
    console.log(location)
})


