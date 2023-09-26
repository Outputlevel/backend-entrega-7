import {Router} from 'express';
import UserService from '../../sevices/userService.js'
import {admin} from '../../middlewares/auth.js'


const router = Router();
const US = new UserService();

router.post("/register", async (req, res) => {
    try {
        //crear rol admin
        const emailAdmin = req.body.email.slice(0,5)
        const passwordAdmin = req.body.password.slice(0,5)
        if(emailAdmin === "admin" && passwordAdmin === "admin"){
            req.body.role = "admin"
        }
        //crea usuario
        await US.createUser(req.body);
        req.session.registerSuccess = true;
        res.redirect("/views/login");
    } catch (error) {
        req.session.registerFailed = true;
        res.redirect("/views/register");
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("hi",req.body)
        const { first_name, last_name, age, role } = await US.login(email, password);
        req.session.user = {first_name, last_name, email, age, role};
        //console.log("here",req.session.user)
        req.session.loginFailed = false;
        res.redirect("/views/");
    } catch (error) {
        req.session.loginFailed = true;
        req.session.registerSuccess = false;
        res.redirect("/views/login");
        
    }
});

router.get("/logout",  (req, res) => {
    req.session.destroy( error => {
        if (!error) res.redirect("/views/login");
        else res.send({status: 'Logout ERROR', body: error});
    });
});

export default router;