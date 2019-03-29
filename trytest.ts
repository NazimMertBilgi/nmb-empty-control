interface User {
    name: string
    surname: string
}

export class Customer implements User {
    name: string; surname: string;
    _getName() {
        return "Hello, " + this.name;
    }
}

let user = new Customer();
user.name = "NMB";
alert(user._getName());