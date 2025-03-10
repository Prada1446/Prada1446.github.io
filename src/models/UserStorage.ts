import UserData from "./UserData";

class UserStorage {
    private static STORAGE_KEY = "user";

    static saveUser(user: UserData) {
        const userData = user.toJSON();
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userData));
    }

    static getUser(): UserData | null {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? UserData.fromJSON(JSON.parse(data)) : null;
    }

    static clearUser() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}

export default UserStorage;