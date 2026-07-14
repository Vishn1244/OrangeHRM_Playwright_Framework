export class FakerUtils {

    /**
     * Generates a unique username.
     * Example: User1720709876543
     */
    static randomUsername(): string {
        return `User${Date.now()}`;
    }

    /**
     * Returns a valid password.
     */
    static randomPassword(): string {
        return "Admin@123";
    }

    /**
     * Returns a unique email address.
     */
    static randomEmail(): string {
        return `user${Date.now()}@testmail.com`;
    }

    /**
     * Returns a random first name.
     */
    static randomFirstName(): string {

        const firstNames = [
            "John",
            "David",
            "Peter",
            "James",
            "Robert"
        ];

        return firstNames[
            Math.floor(Math.random() * firstNames.length)
        ];
    }

    /**
     * Returns a random last name.
     */
    static randomLastName(): string {

        const lastNames = [
            "Smith",
            "Wilson",
            "Brown",
            "Taylor",
            "Johnson"
        ];

        return lastNames[
            Math.floor(Math.random() * lastNames.length)
        ];
    }

    /**
     * Returns a random full name.
     */
    static randomFullName(): string {
        return `${this.randomFirstName()} ${this.randomLastName()}`;
    }

    /**
     * Returns a random mobile number.
     */
    static randomMobile(): string {
        return `9${Math.floor(100000000 + Math.random() * 900000000)}`;
    }

    /**
     * Returns today's timestamp.
     */
    static timestamp(): string {
        return Date.now().toString();
    }

}