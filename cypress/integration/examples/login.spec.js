const Locators = require("../../fixtures/Locators.json")

describe ("Login testing", ()=>{

    let correctEmail = "markojevtic192@gmail.com"
    let correctPassword = "123456789"
    let incorrectFirstEmail = "markojevtic1922@gmail.com"
    let incorrectSecondEmail = "markojevtic.gmail.com"
    let incorrectFirstPassword = "as"
    let incorrectSecondPassword = "markomarko"
    let incorrectThirdEmail = "markojevtic192@?.com"

    beforeEach("Visit link", ()=>{
        cy.visit("/")
        cy.url().should("contains", "https://gallery-app")
    })

    it("Click on login", ()=>{
        cy.get(Locators.Header.Login).eq(1).click()
        cy.url().should("contains", "/login")
        cy.get(".title-style").should("have.text", "Please login")
        cy.get(".title-style").should("be.visible").and("have.text", "Please login")
    })
    it("Successful login", ()=>{
        cy.get(Locators.Header.Login).eq(1).click()
        cy.get(Locators.Login.Email).type(correctEmail)
        cy.get(Locators.Login.Password).type(correctPassword)
        cy.get(Locators.Login.Submit).click()
        cy.wait(300)
        cy.get(Locators.Header.Login).eq(3).should("be.visible")
    })
    it("Successful logout", ()=>{
        cy.get(Locators.Header.Login).eq(1).click()
        cy.url().should("contains", "/login")
        cy.get(Locators.Login.Email).type(correctEmail)
        cy.get(Locators.Login.Password).type(correctPassword)
        cy.get(Locators.Login.Submit).click()
        cy.wait(500)
        cy.get(Locators.Header.Login).eq(3).should("be.visible")
        cy.get(Locators.Header.Login).eq(3).click()
        cy.get(Locators.Header.Login).eq(1).should("be.visible")
        //cy.get(".nav-link").eq(3).should("not.be.visible")
    })
    it("Login without password", ()=>{
        cy.get(Locators.Header.Login).eq(1).click()
        cy.get(Locators.Login.Email).type(correctEmail)
        cy.get(Locators.Login.Submit).click()
        cy.get(Locators.Login.Password).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("Login with incorrect email", ()=>{
        cy.get(Locators.Header.Login).eq(1).click()
        cy.get(Locators.Login.Email).type(incorrectFirstEmail)
        cy.get(Locators.Login.Password).type(correctPassword)
        cy.get(Locators.Login.Submit).click()
        cy.get(Locators.Login.Alert).should("be.visible").and("have.text", "Bad Credentials")
    })
    it("Login with incorrect email type", ()=>{
        cy.get(Locators.Header.Login).eq(1).click()
        cy.get(Locators.Login.Email).type(incorrectSecondEmail)
        cy.get(Locators.Login.Password).type(correctPassword)
        cy.get(Locators.Login.Submit).click()
        cy.get(Locators.Login.Email).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please include an '@' in the email address."+" 'markojevtic.gmail.com'"+" is missing an '@'.")
        })
    })
    it("Login with incorrect password, less than 8 characters", ()=>{
        cy.get(Locators.Header.Login).eq(1).click()
        cy.get(Locators.Login.Email).type(correctEmail)
        cy.get(Locators.Login.Password).type(incorrectFirstPassword)
        cy.get(Locators.Login.Submit).click()
        cy.get(Locators.Login.Alert).should("be.visible").and("have.text", "Bad Credentials")
    })
    it("Login with incorrect password structure, 8 characters but no numbers", ()=>{
        cy.get(Locators.Header.Login).eq(1).click()
        cy.get(Locators.Login.Email).type(correctEmail)
        cy.get(Locators.Login.Password).type(incorrectSecondPassword)
        cy.get(Locators.Login.Submit).click()
        cy.get(Locators.Login.Alert).should("be.visible").and("have.text", "Bad Credentials")
    })
    it("Login with wrong email format, special character after @", ()=>{
        cy.get(Locators.Header.Login).eq(1).click()
        cy.get(Locators.Login.Email).type(incorrectThirdEmail)
        cy.get(Locators.Login.Password).type(correctPassword)
        cy.get(Locators.Login.Submit).click()
        cy.get(Locators.Login.Email).then(($input)=>{
            expect($input[0].validationMessage).to.eq("A part following '@' should not contain the symbol '?'.")
        })
    })

    afterEach("Clearovanje cachea", ()=>{
        cy.clearLocalStorage()
    })




})