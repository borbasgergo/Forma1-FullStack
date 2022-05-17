import {User} from "../Entity/User";

export const storageFunction = {

    setUser(data: User) : User {
        localStorage.setItem('user', JSON.stringify(data))
        return data
    },

    getUser() : User {
        let user = localStorage.getItem("user");
        if(user) {
            const userJson: User = JSON.parse(user!)
            return {
                id: userJson.id,
                jwt: userJson.jwt,
                isLoggedIn: userJson.isLoggedIn,
                username: userJson.username,
            }
        } else {
            return {
                isLoggedIn: false,
            }
        }

    },

    logOut() : User {
        return this.setUser({
            isLoggedIn: false
        })
    }
}