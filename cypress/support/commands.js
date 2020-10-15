// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
const Locators = require("../fixtures/Locators.json")

Cypress.Commands.add("Login", (email, password)=>{
    cy.visit("/login")
    cy.get(Locators.Login.Email).type(email)
    cy.get(Locators.Login.Password).type(password)
    cy.get(Locators.Login.Submit).click()
    cy.server()
    cy.route("GET", "https://gallery-api.vivifyideas.com/api/galleries?page=1&term=").as("waiting")
    cy.wait("@waiting")
})