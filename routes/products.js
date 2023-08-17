import { Router } from "express";
import { Product } from '../productManager/index.js'

const router = Router()

//Da de alta mi constructor
const data = new Product()

let arrProps = {}

///-----------------------------PRODUCTS-----------------------------////
router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit;
        const vehicles = await data.getProducts()

        if (!limit) {
            return res.send({vehicles});
        }
        //Trae objetos por numero de limite
        const arrLimit = vehicles.splice(0, limit);
        res.status(200).send({arrLimit});
    } catch (err) {
        console.error(err)
        return []
    }
});



//Trae vehiculos por Id
router.get('/:idVehicle', async (req, res) => {
    try{
        const idParam = req.params.idVehicle;
        const filteredById = await data.getProductById(idParam)
        if(filteredById){
            return res.status(201).send({filteredById});
        }
        return res.status(403).send("Producto No Encontrado");
    } catch (err) {
        console.error(err)
        return []
    } 
});

//Agrega nuevo vehiculo
router.post('/', async (req, res) => {
    try {
        const productData = {
           title: req.body.title ?? 'No title',
           description: req.body.description ?? 'No description',
           price: req.body.price ?? "No price",
           code: req.body.code ?? "No code",
           category: req.body.category ?? "No category",
           thumbnails: req.body.thumbnails ?? null,
           stock: req.body.stock ?? "No stock"
        }
        const response = await data.addProduct(
            productData.title, productData.description, productData.price, 
            productData.code, productData.stock, productData.category, productData.thumbnails
            )
        return res.status(201).send(response);
    } catch (err) {
        console.error(err)
        return []
    } 
    
});

//Actualiza vehiculo
router.put('/:idVehicle', async (req, res) => {
    try {
        //Encuentra vehiculo por id
        const idParam = req.params.idVehicle;

        const productData = {
           title: req.body.title ?? 'No title',
           description: req.body.description ?? 'No description',
           price: req.body.price ?? "No price",
           code: req.body.code ?? "No code",
           category: req.body.category ?? "No category",
           thumbnails: req.body.thumbnails ?? null,
           stock: req.body.stock ?? "No stock"
        }

        const response = await data.updateProduct(
            productData.title, productData.description, productData.price, 
            productData.code, productData.stock, productData.category, productData.thumbnails, idParam
            )
            if(response) {
                return res.status(201).send(response);
            }
            return res.status(404).send("Producto NO Encontrado");
    } catch (err) {
        console.error(err)
        return []
    } 
    
});

//Elimina vehiculo por Id
router.delete('/:idVehicle', async (req, res) => {
    try{
        const idParam = req.params.idVehicle;
        const message = await data.deleteProductById(idParam)
        res.status(201).send(message);
    } catch (err) {
        console.error(err)
        return []
    } 
});


///Realtime Products
router.get('/realtimeProducts', async (req, res) => {
    try {
        const limit = req.query.limit;
        const vehicles = await data.getProducts()

        if (!limit) {
            return res.send({vehicles});
        }
        //Trae objetos por numero de limite
        const arrLimit = vehicles.splice(0, limit);
        res.status(200).send({arrLimit});
    } catch (err) {
        console.error(err)
        return []
    }
});
export default router