const Locators = require ("../../fixtures/Locators.json")

describe("Testing comments", ()=>{

    let email = "markojevtic192@gmail.com"
    let password = "123456789"
    let comment1 = "random komentar"

    beforeEach("Login user", ()=>{
        cy.Login(email, password)
        cy.get(Locators.Login.Logout).eq(3).should("be.visible")
    })
    it("Add comment to first gallery in my galleries page", ()=>{
        cy.get(Locators.Create.myGalleries).eq(1).click()
        cy.wait(1000)
        cy.get(Locators.Create.pageTitle).should("have.text", "My Galleries")
        cy.get(Locators.Create.galleryTitle).eq(0).click()
        cy.url().should("contain", "/galleries/")
        cy.get("textarea").type(comment1)
        cy.get(Locators.Comment.addComment).eq(2).click()
        cy.wait(1200)
        cy.get(Locators.Comment.addedCom).should("be.visible")
    })
    it("Deleting comment from my gallery", ()=>{
        cy.get(Locators.Create.myGalleries).eq(1).click()
        cy.wait(1000)
        cy.get(Locators.Create.pageTitle).should("have.text", "My Galleries")
        cy.get(Locators.Create.galleryTitle).eq(0).click()
        cy.url().should("contain", "/galleries/")
        cy.get(Locators.Comment.allComments).should("be.visible")
        cy.get(Locators.Comment.delComment).eq(0).click()
    })
})