const Locators = require("../../fixtures/Locators.json")

describe ("Register testing", ()=>{

    let correct_email = "testtest@test.com"
    let existing_email = "markojevtic192@gmail.com"
    let invalid_email1 = "markojevtic.gmail.com"
    let invalid_email2 = "markojevtic@gmail"
    let invalid_email3 = "markojevtic@.com"
    let invalid_email4 = "@gmail.com"
    let correct_password = "123456789"
    let invalid_password1 = "test12"
    let invalid_password2 = "markomarko"
    let incorrect_password_confirmation = "12345678"
    let first_name = "Marko"
    let last_name = "Jevtic"

    beforeEach("Visit register page", ()=>{
        cy.visit("/register")
        cy.url().should("contains", "register")
    })
    it("Create user without first name", ()=>{
        cy.get(Locators.Register.lastName).type(last_name)
        cy.get(Locators.Register.rEmail).type(correct_email)
        cy.get(Locators.Register.rPassword).type(correct_password)
        cy.get(Locators.Register.rPasswordConfirmation).type(correct_password)
        cy.get(Locators.Register.termsAndConditions).click()
        cy.get(Locators.Register.rSubmit).click()
        cy.get(Locators.Register.firstName).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("Create user without last name", ()=>{
        cy.get(Locators.Register.firstName).type(first_name)
        cy.get(Locators.Register.rEmail).type(correct_email)
        cy.get(Locators.Register.rPassword).type(correct_password)
        cy.get(Locators.Register.rPasswordConfirmation).type(correct_password)
        cy.get(Locators.Register.termsAndConditions).click()
        cy.get(Locators.Register.rSubmit).click()
        cy.get(Locators.Register.lastName).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("Create user without password", ()=>{
        cy.get(Locators.Register.firstName).type(first_name)
        cy.get(Locators.Register.lastName).type(last_name)
        cy.get(Locators.Register.rEmail).type(correct_email)
        cy.get(Locators.Register.termsAndConditions).click()
        cy.get(Locators.Register.rSubmit).click()
        cy.get(Locators.Register.rPassword).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("Create user without password confirmation", ()=>{
        cy.get(Locators.Register.firstName).type(first_name)
        cy.get(Locators.Register.lastName).type(last_name)
        cy.get(Locators.Register.rEmail).type(correct_email)
        cy.get(Locators.Register.rPassword).type(correct_password)
        cy.get(Locators.Register.termsAndConditions).click()
        cy.get(Locators.Register.rSubmit).click()
        cy.get(Locators.Register.rPasswordConfirmation).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("Password confirmation does not match", ()=>{
        cy.get(Locators.Register.firstName).type(first_name)
        cy.get(Locators.Register.lastName).type(last_name)
        cy.get(Locators.Register.rEmail).type(correct_email)
        cy.get(Locators.Register.rPassword).type(correct_password)
        cy.get(Locators.Register.rPasswordConfirmation).type(incorrect_password_confirmation)
        cy.get(Locators.Register.termsAndConditions).click()
        cy.get(Locators.Register.rSubmit).click()
        cy.get(Locators.Register.alertMessage).should("be.visible").and("have.text", "The password confirmation does not match.")
    })
    it("Password shorter than required", ()=>{
        cy.get(Locators.Register.firstName).type(first_name)
        cy.get(Locators.Register.lastName).type(last_name)
        cy.get(Locators.Register.rEmail).type(correct_email)
        cy.get(Locators.Register.rPassword).type(invalid_password1)
        cy.get(Locators.Register.rPasswordConfirmation).type(invalid_password1)
        cy.get(Locators.Register.termsAndConditions).click()
        cy.get(Locators.Register.rSubmit).click()
        cy.get(Locators.Register.alertMessage).should("be.visible").and("have.text", "The password must be at least 8 characters.")
    })
    it("Password does not contain numbers", ()=>{
        cy.get(Locators.Register.firstName).type(first_name)
        cy.get(Locators.Register.lastName).type(last_name)
        cy.get(Locators.Register.rEmail).type(correct_email)
        cy.get(Locators.Register.rPassword).type(invalid_password2)
        cy.get(Locators.Register.rPasswordConfirmation).type(invalid_password2)
        cy.get(Locators.Register.termsAndConditions).click()
        cy.get(Locators.Register.rSubmit).click()
        cy.get(Locators.Register.alertMessage).should("be.visible").and("have.text", "The password format is invalid.")
    })
    it("Register user with existing email", ()=>{
        cy.get(Locators.Register.firstName).type(first_name)
        cy.get(Locators.Register.lastName).type(last_name)
        cy.get(Locators.Register.rEmail).type(existing_email)
        cy.get(Locators.Register.rPassword).type(correct_password)
        cy.get(Locators.Register.rPasswordConfirmation).type(correct_password)
        cy.get(Locators.Register.termsAndConditions).click()
        cy.get(Locators.Register.rSubmit).click()
        cy.get(Locators.Register.alertMessage).should("be.visible").and("have.text", "The email has already been taken.")
    })
    it("Register user with email not containing @", ()=>{
        cy.get(Locators.Register.firstName).type(first_name)
        cy.get(Locators.Register.lastName).type(last_name)
        cy.get(Locators.Register.rEmail).type(invalid_email1)
        cy.get(Locators.Register.rPassword).type(correct_password)
        cy.get(Locators.Register.rPasswordConfirmation).type(correct_password)
        cy.get(Locators.Register.termsAndConditions).click()
        cy.get(Locators.Register.rSubmit).click()
        cy.get(Locators.Register.rEmail).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please include an '@' in the email address. "+"'"+ invalid_email1 +"'"+" is missing an '@'.")
        })
    })
    it("Register user with top level domain missing in email", ()=>{
        cy.get(Locators.Register.firstName).type(first_name)
        cy.get(Locators.Register.lastName).type(last_name)
        cy.get(Locators.Register.rEmail).type(invalid_email2)
        cy.get(Locators.Register.rPassword).type(correct_password)
        cy.get(Locators.Register.rPasswordConfirmation).type(correct_password)
        cy.get(Locators.Register.termsAndConditions).click()
        cy.get(Locators.Register.rSubmit).click()
        cy.get(Locators.Register.alertMessage).should("be.visible").and("have.text", "The email must be a valid email address.")
    })
    it("Register user with domain name missing in email", ()=>{
        cy.get(Locators.Register.firstName).type(first_name)
        cy.get(Locators.Register.lastName).type(last_name)
        cy.get(Locators.Register.rEmail).type(invalid_email3)
        cy.get(Locators.Register.rPassword).type(correct_password)
        cy.get(Locators.Register.rPasswordConfirmation).type(correct_password)
        cy.get(Locators.Register.termsAndConditions).click()
        cy.get(Locators.Register.rSubmit).click()
        cy.get(Locators.Register.rEmail).then(($input)=>{
            expect($input[0].validationMessage).to.eq("'.' is used at a wrong position in '.com'.")
        })
    })
    it("Register user with recipient name missing in email", ()=>{
        cy.get(Locators.Register.firstName).type(first_name)
        cy.get(Locators.Register.lastName).type(last_name)
        cy.get(Locators.Register.rEmail).type(invalid_email4)
        cy.get(Locators.Register.rPassword).type(correct_password)
        cy.get(Locators.Register.rPasswordConfirmation).type(correct_password)
        cy.get(Locators.Register.termsAndConditions).click()
        cy.get(Locators.Register.rSubmit).click()
        cy.get(Locators.Register.rEmail).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please enter a part followed by '@'. '"+ invalid_email4 +"' is incomplete.")
        })
    })
    it("Register user without checking terms and conditions box", ()=>{
        cy.get(Locators.Register.firstName).type(first_name)
        cy.get(Locators.Register.lastName).type(last_name)
        cy.get(Locators.Register.rEmail).type(correct_email)
        cy.get(Locators.Register.rPassword).type(correct_password)
        cy.get(Locators.Register.rPasswordConfirmation).type(correct_password)
        cy.get(Locators.Register.rSubmit).click()
        cy.get(Locators.Register.alertMessage).should("be.visible").and("have.text", "The terms and conditions must be accepted.")
    })

    afterEach("Clear cache", ()=>{
        cy.clearLocalStorage()
    })

})