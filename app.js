import express from 'express';
import routerProducts from './routes/products.js'
import routerCart from './routes/cart.js'
import viewsRouter from './routes/views.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import {Server} from 'socket.io';

export const messages = [];
export let testPush = [] //Prepara props para handlebars
export let vehicleId = 0

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//Use routers
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCart);
app.use('/views', viewsRouter);


//-------------Handlebars---------------////

//Se inicializa el motor de plantillas
app.engine('handlebars', handlebars.engine());

//Establece la ruta de las vistas
app.set('views', __dirname + '/views');

//Establece el motor de renderizado
app.set('view engine', 'handlebars');

//Establece el servidor estático de archivos
app.use(express.static( __dirname + '/public'));

///----------LISTENING ON PORT-------------/////
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor arriba en el puerto ${PORT}`);
});

//-------------Web Sockets--------//////////

const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    socket.on('message', data => {
        //console.log(data);+
        socketServer.emit('messageShow', data);
    });

    socket.on('addProduct', data => {
        console.log("dataa", data);
        testPush = data
/*         testPush.push({
            //socketId: socket.id,
            //message: data,
            vehicles: data
        }); */
        socketServer.emit('addProduct', testPush);
    });

    socket.on('deleteVehicle', data => {
        vehicleId = data
        console.log(vehicleId)
        socketServer.emit('deleteVehicle', vehicleId);
    });
});