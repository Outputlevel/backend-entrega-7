import userModel from "../productManager/dao/models/users.js";
import {createHash, isValidPassword} from '../utils/functionsUtil.js';

class UserService {

    async createUser(user) {
        try {
            console.log(user)
            user.password = createHash(user.password);
            return await userModel.create(user);
        } catch (error) {
            throw new Error(error.message.replace(/"/g, "'"));
        }
    }

    async login(email, password) {
        try {
            const user = await userModel.find({email: email});
            console.log("US.login()",user)

            if (user.length > 0 && isValidPassword(user[0], password)) {
                return user[0];
            }
            
            throw new Error('Login failed');

        } catch (error) {
            throw new Error(error.message.replace(/"/g, "'"));
        }
    }

}

export default UserService;