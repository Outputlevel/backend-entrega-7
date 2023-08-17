import { Router } from "express";
import { Product } from '../productManager/index.js'
//import { messages } from "../app.js";
import { testPush } from "../app.js";
import { vehicleId } from "../app.js";

const router = Router();

const data = new Product() //Da de alta mi constructor

let arrProps = null


router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit;
        const vehicles = await data.getProducts()
        arrProps = {
            title: "Vechicles",
            style: "style.css",
            vehicles: vehicles
        }

        if (!limit) {
            console.log(vehicles)
            return res.render('home', arrProps)
        }
        //Trae objetos por numero de limite
        const arrLimit = vehicles.splice(0, limit);
        res.status(200).render('home', vehicles).send({arrLimit});
        
    } catch (err) {
        console.error(err)
        return []
    }
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        const limit = req.query.limit;
        const vehicles = await data.getProducts()
        console.log(">>!", testPush )
        console.log(">>?", vehicleId.vehicleId )
        if(vehicleId){
            //arrProps = vehicleId
            const findVehicle = await data.deleteProductById(vehicleId)
            const newArr = await data.getProducts()
            arrProps = {
                title: "Vechicles",
                style: "style.css",
                vehicles: newArr
            }
            console.log("vehiculo borrado", arrProps)
            return res.render('web', arrProps)
        }
        arrProps = testPush
        
        console.log(arrProps)

        if(!arrProps.length){
            console.log(">>>11", arrProps )
            arrProps = {
                title: "Vechicles",
                style: "style.css",
                vehicles: vehicles
            }
            return res.render('web', arrProps)
        }

        const arrKeys = testPush[0]
        const newVehicle = await data.addProduct(arrKeys.title, arrKeys.description, arrKeys.price, arrKeys.code, arrKeys.stock, arrKeys.category, arrKeys.thumbnails)
        const newData = await data.getProducts()

        if (!limit) {
  
            arrProps = {
            title: "Vechicles",
            style: "style.css",
            vehicles: newData
              
        }
            console.log(vehicles)
            return res.render('web', arrProps)
        }
        //Trae objetos por numero de limite
        const arrLimit = vehicles.splice(0, limit);
        res.status(200).render('web', vehicles).send({arrLimit});
        
    } catch (err) {
        console.error(err)
        return []
    }
});


export default router;