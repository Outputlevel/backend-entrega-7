import fs from 'fs';

const id = 0
let products = []
let productsFiltered = []
let path = "./productManager/products/data.json" //ruta de archivo JSON para ser usado como variable

export default class Product {
    constructor (title, description, price, code, stock, id ) {
        this.title = title
        this.description = description
        this.price = price
        this.code = code
        this.stock = stock
        this.id = products.length + 1
 
    }
    //Create new folder in directory    
    async createFolder(){
        try {
          const folderExist = fs.existsSync('./products'); 
          if(!folderExist){ //Valida si folder existe para finalizar promesa
            await fs.promises.mkdir('./products');
             console.log("New folder added");
            return
          };
          console.log("Folder ya existe en app")
          return
        } catch (err) {
          throw new Error(err);
        };
      };

    //To distribute current objects to class methods *will NOT print in console*. Will also parse JSON  
    async findProducts() {
        try {
            const getArr = await fs.promises.readFile(path, "utf-8");
            //console.log(getArr)
            return JSON.parse(getArr); //Parse objects
        } catch (error) {
            console.error(error);
            return [];
        }
    } 

    //Method to print current objects in console
    async getProducts() {
        try {
            const getArr = await this.findProducts()
            return getArr
            console.log("Current Products >>>", getArr)
        } catch (error) {
            console.error(error);
            return [];
        }
    } 

   async addProduct(title, description, price, code, stock) {
    let product = new Product(title, description, price, code, stock)
        try {
            const products = await this.findProducts()
            product.id = products.length + 1
            productsFiltered = products.find(p => {
                return p.code == code
            })
            //Validacion si Code NO existe
            if(!productsFiltered) {
                console.log("Producto a agregar", product)
                products.push(product)
                await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"))
                console.log("Producto creado correctamente!")
                return
            }
            console.log("Codigo ya existe, intente de nuevo!")
            return    
        } catch (err) {
            console.error(err)
            return []
        }
   }
    //Actualizacion de producto, busqueda por Code
    async updateProduct(title, description, price, code, stock) {
        let product = new Product(title, description, price, code, stock)
        try {
            const products = await this.findProducts()
            //Encuentra ID para mostrar en consola producto eliminado
            productsFiltered = products.find(p => {
                return p.code === code
            })
            product.id = productsFiltered.id
            console.log(`Old:`, productsFiltered)
            console.log(`Updated:`, product)
            
            //Encuentra productos que no tienen mismo Code, esos se imprimiran, actualizando el producto
            let newArr = products.filter(p => {
                return p.code !== code
            })
            newArr.push(product)
            await fs.promises.writeFile(path, JSON.stringify(newArr, null, "\t"))
            
        } catch (err) {
            console.error(err)
            return []
        }  
    } 
    //Encuentra producto por ID
    async getProductById(id) {
        let productsFiltered = []
        try {
            const products = await this.findProducts()
            productsFiltered = products.find(p => {
                return p.id === id
            })
            console.log(`Filtered by ID: ${id}`, productsFiltered)
            return productsFiltered 
        } catch (err) {
            console.error(err)
            return []
        }  
    } 
    //Elminia producto por ID
    async deleteProductById(id) {
        try {
            const products = await this.findProducts()
            //Encuentra ID para mostrar en consola producto eliminado
            productsFiltered = products.find(p => {
                return p.id === id
            })
            console.log(`Deleted by ID: ${id}`, productsFiltered)
            //Encuentra productos que no tienen mismo ID, esos se imprimiran, eliminando el primer objeto
            productsFiltered = products.filter(p => {
                return p.id !== id
            })
            await fs.promises.writeFile(path, JSON.stringify(productsFiltered, null, "\t"))
             
        } catch (err) {
            console.error(err)
            return []
        }  
    }
    //Encuentra todos los productos
    async deleteAll() {
        const products = await this.findProducts()
        console.log("Products Deleted:", products)
        const newArr = []
        await fs.promises.writeFile(path, JSON.stringify(newArr, null, "\t"))

    }
 }

