import express from 'express';
import Product from './productManager/index.js'

const app = express();

//Da de alta mi constructor
const data = new Product()

app.use(express.urlencoded({extended: true}));

//Trae todos los productos
app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    const vehicles = await data.getProducts()

    if (!limit) {
        return res.send({vehicles});
    }
    //Trae objetos por numero de limite
    const arrLimit = vehicles.splice(0, limit);
    res.send({arrLimit});
});

//Trae vehiculos por Id
app.get('/products/:idVehicle', async (req, res) => {
    const idParam = req.params.idVehicle;
    const filteredById = await data.getProductById(idParam)
    res.send({filteredById});
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor arriba en el puerto ${PORT}`);
});