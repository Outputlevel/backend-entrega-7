import express from 'express';
import routerProducts from './routes/products.js'
import routerCart from './routes/cart.js'


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//Use routers
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCart);




///---------------------------LISTENING ON PORT----------------------------///////////
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor arriba en el puerto ${PORT}`);
});

