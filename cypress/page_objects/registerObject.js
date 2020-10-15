export default class AuthRegister {

    get first_name (){
        return cy.get("#first-name")
    }
    get last_name() {
        return cy.get("#last-name")
    }
    get email() {
        return cy.get("#email")
    }
    get password() {
        return cy.get("#password")
    }
    get password_confirmation() {
        return cy.get("#password-confirmation")
    }
    get check_box () {
        return cy.get(".form-check-input")
    }
    get submit () {
        return cy.get(".btn")
    }

    register (ime, prezime, mejl, sifra, sifra_potvrdi) {
        this.first_name.type(ime)
        this.last_name.type(prezime)
        this.email.type(mejl)
        this.password.type(sifra)
        this.password_confirmation.type(sifra_potvrdi)
        this.check_box.click()
        this.submit.click()
    }

}
export const authRegister = new AuthRegister()