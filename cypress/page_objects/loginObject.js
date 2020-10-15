export default class AuthLogin {
    get email() {
        return cy.get("#email")
    }
    get password() {
        return cy.get("#password")
    }
    get submit() {
        return cy.get(".btn")
    }
    login (email, password) {
        this.email.type(email)
        this.password.type(password)
        this.submit.click()
    }

}
export const authLogin = new AuthLogin()
