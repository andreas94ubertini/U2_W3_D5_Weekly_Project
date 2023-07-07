const autKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3Yjc4OTEyYjUwYzAwMTQ5ZTRlZWUiLCJpYXQiOjE2ODg3MTMwOTcsImV4cCI6MTY4OTkyMjY5N30.7d1XI3u7PhFr1Fv609gKxcN79dpSvx5Rn1kFnMBlNGI"
const myUrl = 'https://striveschool-api.herokuapp.com/api/product/'
const addressBarContent = new URLSearchParams(location.search)
const eventId = addressBarContent.get('id')
const reset = function (){
    document.getElementById('form').reset()
}
console.log(eventId)
const eventForm = document.getElementById('form')
if (eventId) {
    fetch(myUrl + eventId, {
        headers:{
            'Authorization': autKey
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("Errore")
            }
        })
        .then((product) => {
            console.log('DETAIL', product)
            const nameInput = document.getElementById('product-name')
            const descriptionInput = document.getElementById('description')
            const brandInput = document.getElementById('brand')
            const imageInput = document.getElementById('img-url')
            const priceInput = document.getElementById('price')

            nameInput.value = product.name
            descriptionInput.value = product.description
            brandInput.value = product.brand
            imageInput.value = product.imageUrl
            priceInput.value = product.price

        })
        .catch((err) => console.log(err))
    document.querySelector('.btn-primary').innerText = 'Modifica Prodotto'
    const newbtn = document.createElement('button')
    newbtn.classList.add('btn', 'btn-danger')
    newbtn.setAttribute('type', 'button')
    newbtn.setAttribute('data-bs-toggle', 'modal')
    newbtn.setAttribute('data-bs-target', '#exampleModal2')
    newbtn.innerText = 'Elimina dello store'
    document.getElementById('btn-cont').appendChild(newbtn)
    document.getElementById('elimina').addEventListener('click', function () {
        console.log('elimina')
        fetch(myUrl + eventId, {
            method: 'DELETE',
            headers:{
                'Authorization': autKey
            }
        })
            .then((res) => {
                console.log(eventId)
                if (res.ok) {
                        location.assign('./index.html')
                } else {

                    throw new Error('errore')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    })
    }
const resetBtn = document.createElement('button')
resetBtn.classList.add('btn', 'btn-secondary')
resetBtn.setAttribute('type', 'button')
resetBtn.setAttribute('data-bs-toggle', 'modal')
resetBtn.setAttribute('data-bs-target', '#exampleModal1')
resetBtn.innerText ='Resetta form'
document.getElementById('btn-cont').appendChild(resetBtn)
document.getElementById('reset').addEventListener('click', reset)


const formFunction = function (){
    const nameInput = document.getElementById('product-name')
    const descriptionInput = document.getElementById('description')
    const brandInput = document.getElementById('brand')
    const imageInput = document.getElementById('img-url')
    const priceInput = document.getElementById('price')

    const newProduct = {
        name: nameInput.value,
        description: descriptionInput.value,
        brand: brandInput.value,
        imageUrl: imageInput.value,
        price: priceInput.value
    }

    // const urlToUse = eventId ? URL + '/' + eventId : URL
    let urlToUse
    if (eventId) {
        urlToUse = myUrl + eventId
    } else {
        urlToUse = myUrl
    }

    let methodToUse
    if (eventId) {
        methodToUse = 'PUT'
    } else {
        methodToUse = 'POST'
    }
    fetch(urlToUse, {
        method: methodToUse,
        body: JSON.stringify(newProduct),
        headers: {
            'Authorization': autKey,
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            if (res.ok) {
                nameInput.value = ''
                descriptionInput.value = ''
                brandInput.value = ''
                priceInput.value = ''
                imageInput.value = ''
            } else {
                throw new Error("Errore nel salvataggio dell'evento")
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

eventForm.addEventListener('submit', function (e) {
    e.preventDefault()
    formFunction()
})