const Locators = require ("../../fixtures/Locators.json")

describe("Testing edit function", ()=>{
    let email = "markojevtic192@gmail.com"
    let password = "123456789"
    let new_title = "Novi naslov"
    let img1 = "https://media.wired.com/photos/593261cab8eb31692072f129/master/pass/85120553.jpg"
    let img3 = "https://cdn.mos.cms.futurecdn.net/2Gwau7TtiHM5PdsjFeaxnm-320-80.jpg"
    let desc = "added description"

    beforeEach("Login user", ()=>{
        cy.Login(email,password)
        cy.get(Locators.Create.myGalleries).eq(1).click()
        cy.wait(1000)
        //cy.server()
        //cy.route("GET", "https://gallery-api.vivifyideas.com/api/my-galleries?page=1&term=").as("more")
        //cy.wait("@more")
    })
    it("Edit title", ()=>{
        cy.get(Locators.Create.galleryTitle).eq(0).click()
        cy.wait(1000)
        cy.get(Locators.Edit.editButton).eq(1).click()
        cy.wait(1000)
        cy.get(Locators.Create.title).clear()
        cy.get(Locators.Create.title).type(new_title)
        cy.get(Locators.Create.submit).eq(0).click()
    })
    it("Add description", ()=>{
        cy.get(Locators.Create.galleryTitle).eq(0).click()
        cy.wait(1000)
        cy.get(Locators.Edit.editButton).eq(1).click()
        cy.wait(1000)
        cy.get(Locators.Create.description).type(desc)
        cy.get(Locators.Create.submit).eq(0).click()

    })
    it("Add another image", ()=>{
        cy.get(Locators.Create.galleryTitle).eq(0).click()
        cy.wait(1000)
        cy.get(Locators.Edit.editButton).eq(1).click()
        cy.wait(1000)
        cy.get("button").eq(2).click()
        cy.get(Locators.Create.img).eq(3).type(img1)
        cy.get(Locators.Create.submit).eq(0).click()
    })
    it("Rearrange images", ()=>{
        cy.get(Locators.Create.galleryTitle).eq(0).click()
        cy.wait(1000)
        cy.get(Locators.Edit.editButton).eq(1).click()
        cy.wait(1000)
        cy.get(Locators.Create.moveButton).eq(2).click()
        cy.get(Locators.Create.submit).eq(0).click()
    })
    it("Remove one img url from gallery", ()=>{
        cy.get(Locators.Create.galleryTitle).eq(0).click()
        cy.wait(1000)
        cy.get(Locators.Edit.editButton).eq(1).click()
        cy.wait(1000)
        cy.get("button").eq(2).click()
        cy.get(Locators.Create.img).eq(3).type(img3)
        cy.get(Locators.Create.deleteImg).eq(3).click()
        cy.get(Locators.Create.submit).eq(0).click()
    })






})