const socket = io(); // Conectar con el servidor de Socket.io

const titleInput = document.querySelector("#title-input");
const priceInput = document.querySelector("#price-input");
const descriptionInput = document.querySelector("#description-input");
const categoryInput = document.querySelector("#category-input");
const codeInput = document.querySelector("#code-input");
const stockInput = document.querySelector("#stock-input");


function send() {

    if(!titleInput.value){
        alert("Agregue titulo a producto")
        return
    }
    let vehicles = {
        title: titleInput.value,
        description: descriptionInput.value,
        price: priceInput.value,
        code: codeInput.value,
        category: categoryInput.value,
        status: true,
        thumbnails: null,
        stock: stockInput.value
    } 
    console.log(vehicles)
    socket.emit('addProduct', [vehicles]);
    setTimeout(function(){window.location.reload();},10);
}

function deleteVehicle(id)  {
    let data = id
    socket.emit('deleteVehicle', data);
    setTimeout(function(){window.location.reload();},10);
};

