import { faker } from "@faker-js/faker";

export class FakerUtils {

    static employee() {

        const firstName = faker.person.firstName();
        const middleName = faker.person.middleName();
        const lastName = faker.person.lastName();
        const username = faker.internet.username().toLowerCase();
        const password = "Admin@123";

        return {
            firstName,
            middleName,
            lastName,
            employeeName: `${firstName} ${middleName} ${lastName}`,
            username,
            password
        };
    }

    static username() {
        return faker.internet.username().toLowerCase();
    }

    static password() {
        return "Admin@123";
    }
    
}