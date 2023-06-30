import { of } from "rxjs";
import { User } from "src/app/models/user";

export class UserServiceStub {
    getUsers() {
        console.log("getUsers() from stub is called");
        return of([] as User[]);
    }

    addUser(user:User) {
        console.log("addUser() from stub is called");
        return of({} as User);
    }
}
