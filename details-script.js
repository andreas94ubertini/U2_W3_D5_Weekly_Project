const autKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3Yjc4OTEyYjUwYzAwMTQ5ZTRlZWUiLCJpYXQiOjE2ODg3MTMwOTcsImV4cCI6MTY4OTkyMjY5N30.7d1XI3u7PhFr1Fv609gKxcN79dpSvx5Rn1kFnMBlNGI"
let myUrl = 'https://striveschool-api.herokuapp.com/api/product/'
const addressBarContent = new URLSearchParams(location.search)
let eventId = addressBarContent.get('id')
myUrl = myUrl+eventId
const getProduct = function (){
    fetch(myUrl, {
        headers:{
            'Authorization': autKey
        }
    })
        .then(res =>{
            if(res.ok){
                return res.json()
            }else{
                throw new Error('errore')
            }
        })
        .then(product=>{
            console.log(product)
            let newRow = document.createElement('div')
            newRow.classList.add('row', 'start', 'mt-5', 'flex-column', 'flex-md-row')
            newRow.innerHTML = `
            <div class="col-6">
                <div id="img-cont">
                    <img src="${product.imageUrl}" alt="phone pic" class="shadow-lg img-fluid">
                </div>
            </div>
            <div class="col-6 d-flex flex-column justify-content-center">
                <h2>${product.brand} ${product.name}</h2>
                <p class="h5">${product.description}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                  <ul class="list-group">
                       <p>Scegli colore</p>
                      <li class="list-group-item">
                        <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="firstRadio" checked>
                        <label class="form-check-label" for="firstRadio">White</label>
                      </li>
                      <li class="list-group-item">
                        <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="secondRadio">
                        <label class="form-check-label" for="secondRadio">Blue</label>
                      </li>
                      <li class="list-group-item">
                        <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="thirdRadio">
                        <label class="form-check-label" for="thirdRadio">Black</label>
                      </li>
                  </ul>
                  <button class="btn btn-success mt-3">Aggiungi al carrello</button>
            </div>
            `
            document.getElementById('container').appendChild(newRow)
            }
        )
        .catch(err =>{
            log(err)
        })

}

getProduct()