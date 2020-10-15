const Locators = require("../../fixtures/Locators.json")

describe("Delete gallery testing", ()=>{

    let email = "markojevtic192@gmail.com"
    let password = "123456789"
    let imgUrl2 = "https://media.wired.com/photos/593261cab8eb31692072f129/master/pass/85120553.jpg"
    let title = "random title"

    beforeEach("Login user", ()=>{
        cy.Login(email, password)
        cy.get(Locators.Login.Logout).eq(3).should("be.visible")
    })
    it("Create gallery and delete it", ()=>{
        cy.get(Locators.Create.createPage).eq(2).click()
        cy.get(Locators.Create.title).type(title)
        cy.get(Locators.Create.img).eq(2).type(imgUrl2)
        cy.get(Locators.Create.submit).eq(0).click()
        cy.wait(1000)
        cy.get(Locators.Create.myGalleries).eq(1).click()
        cy.wait(2000)
        cy.get(Locators.Create.galleryTitle).eq(0).click()
        cy.wait(1000)
        cy.get(Locators.Delete.deleteButton).eq(0).click()
        cy.get(Locators.Create.pageTitle).should("have.text", "All Galleries")

    })
    afterEach("Clear cache", ()=>{
        cy.clearLocalStorage()
    })
})