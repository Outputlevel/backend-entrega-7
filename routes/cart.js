import { Router } from "express";
import { Cart } from '../productManager/index.js'

const router = Router()

//Da de alta mi constructor
export const cart = new Cart()
//cart.addToCart(1,3)

///-----------------------------CART-----------------------------////

//Trae Todos los carritos
router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit;
        const cartProducts = await cart.getCarts()

        if (!limit) {
            return res.send({cartProducts});
        }
        //Trae objetos por numero de limite
        const cartProductsLimit = vehicles.splice(0, limit);
        res.send({cartProductsLimit});
    } catch (err) {
        console.error(err)
        return []
    } 
    
});

///Trae Carrito por ID
router.get('/:cartId', async (req, res) => {
    try{
        const idParam = req.params.cartId;
        const filteredById = await cart.getCartById(idParam)
        if(filteredById){
            return res.status(201).send({filteredById});
        }
        return res.status(403).send("Producto No Encontrado");
    } catch (err) {
        console.error(err)
        return []
    } 
});

//Crear Carrito
router.post('/', async (req, res) => {
    try {
        const newCart = await cart.createCart()
        res.send(newCart);
    } catch (err) {
        console.error(err)
        return []
    } 
});

router.post('/:cartId/product/:productId', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const productId = req.params.productId;
        const newCart = await cart.addToCart(cartId, productId)
        res.send(newCart);
    } catch (err) {
        console.error(err)
        return []
    } 
});

export default router