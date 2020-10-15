export default class AuthCreate {

    get title() {
        return cy.get("#title")
    }
    get description () {
        return cy.get("#description")
    }
    get img() {
        return cy.get(".form-control").eq(2)
    }
    get addImage() {
        return cy.get("button")
    }
    get submit() {
        return cy.get(".btn").eq(0)
    }
    get cancel() {
        return cy.get(".btn").eq(1)
    }

    createGallery (naslov,opis,urlSlike) {
        this.title.type(naslov)
        this.description.type(opis)
        this.img.type(urlSlike)
        this.submit.click()
    }



}
export const authCreate = new AuthCreate()