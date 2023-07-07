const autKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3Yjc4OTEyYjUwYzAwMTQ5ZTRlZWUiLCJpYXQiOjE2ODg3MTMwOTcsImV4cCI6MTY4OTkyMjY5N30.7d1XI3u7PhFr1Fv609gKxcN79dpSvx5Rn1kFnMBlNGI"
const myUrl = 'https://striveschool-api.herokuapp.com/api/product/'
const getProducts = function (){
    fetch(myUrl, {
        headers:{
            'Authorization': autKey
        }
    })
        .then(res =>{
            if(res.ok){
                return res.json()
            }
            if(res.status === 404){
                console.log(res.status)
                throw new Error('risorsa non trovata error 404')
            }
            if(res.status === 401){
                console.log(res.status)
                throw new Error('accesso non autorizzato error 401')
            }
        })
        .then(products =>{
            products.forEach(product =>{
                console.log(product)
                const newCol = document.createElement('div')
                newCol.classList.add('col-12', 'col-md-6')
                newCol.innerHTML = `
                        <div class="card mb-3 shadow-lg" style="max-width: 540px;">
              <div class="row g-0 align-items-center">
                <div class="col-md-4">
                  <img src="${product.imageUrl}" class="w-100 rounded-start" alt="product pic">
                </div>
                <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.brand}</p>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text"><small class="text-body-secondary">${product.price} €</small></p>
                        <div class="d-flex flex-column">
                        <a href="./details.html?id=${product._id}" class="btn btn-success">Scopri di più</a>
                        <a href="./backoffice.html?id=${product._id}" class="btn btn-warning">Modifica</a>
                        </div>
                      </div>
                </div>
          </div>
        </div>
                `
                document.getElementById('spinner').classList.add('d-none')
                document.getElementById('product-row').appendChild(newCol)
            })
        })
        .catch(err=>{
            alert(err)
        })
}
getProducts()