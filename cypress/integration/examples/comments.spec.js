const Locators = require ("../../fixtures/Locators.json")

describe("Testing comments", ()=>{

    let email = "markojevtic192@gmail.com"
    let password = "123456789"
    let comment1 = "random komentar"
    let longComment = "xFHMgVlDcMqq6bKOQL6uWES0IlXzrEY4vNBQKe8GNmNzzgPwImVi3PhIjm6MQqkLnSLUIUnOo20qkcRVOm0xICFOHFK3hC1y0Opj4u6RGY9G4AuJXyVZfE16kig2w516gktJuWigXtwT39kAdbwpn9OkRKIhk1AX1nWjHKarCi7D5Jie0Qf5qsI7tvgiONDjKAbsnKXw0VNP2bALxEDac5dRySF9kVYLF7NMmqKbGpWcuEwGsMFlptywLcex74e206XtHGtE3qgistaRqIUzRl3ZkhbN4Nm7FhAnhGrXQQuWFaOtstsxEWOU8FnJttLOlBRsRC13y0IoRM1xkXQoWxCqCsOrBShQSLDPfbSqyxBRpSPYFUT2VwNNkVGZ8wL9lmF0reYwwGLAl5wNv7nNRQhik06C7VwIMOfSVgZ8SRtXYhYRKYU9BmCc0xdzrnEo5U21uh2Dm6CEHp39TV8dBXK82uUOTP1xLxp8aiBu0ot3gGkpUcVBEKzLagTIBNo8CHcbZCUiadYcu3QQHKwO9V9slCcBsEu7Hf6nlSG1oQHbmi5xKcTlTPobsfjrSNvoQMT5JTivMbZxdTRi6DQRBJhqq0ev2EbIG3wqbmQz6fJ9PSdkGOIpPI8CJlCePwLsIbluC0gK0IWLlg6J6IGtK4oYIUWxkXqLwNRQC3f2SwOlc0YDouK2NLLXZFl7EXGF8XWWUxcHlnTarCQ11l2V47xmSqtYlCbePVlmwFuhHbxoZdoHunAC0G6p0IyqcMLB9RM0ygnvCZPHrfIlDLBqKjWaOmNPETrrLWWEYx2ew5FTEZoYwCpnf0HJDHOVpx0yb0u0920SQmsbBBOLNdTBAG0qKAEFrVGhGyM6yJdLcScd3kEzw5US8td1RdHedVmEpQADId7tWDAt7zKtnF8uMeqbjqGNy61cAnxHEcRWytY9540UxLoEel3V4BDH4Payuw93u7KP8VVDeSlatEXLmS42hjwDVsE75oMHouPdD"

    beforeEach("Login user", ()=>{
        cy.Login(email, password)
        cy.get(Locators.Login.Logout).eq(3).should("be.visible")
    })
    it("Add comment to first gallery in my galleries page", ()=>{
        cy.AddComment(comment1)
    })
    it("Deleting comment from my gallery", ()=>{
        cy.AddComment(comment1)
        cy.get(Locators.Comment.delComment).eq(0).click()
    })
    it("Add empty comment", ()=>{
        cy.get(Locators.Create.myGalleries).eq(1).click()
        cy.wait(1000)
        cy.get(Locators.Create.pageTitle).should("have.text", "My Galleries")
        cy.get(Locators.Create.galleryTitle).eq(0).click()
        cy.url().should("contain", "/galleries/")
        cy.get(Locators.Comment.addComment).eq(2).click()
        cy.get("textarea").then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
        
    })
    it("Add comment longer than 1000 characters", ()=>{
        cy.get(Locators.Create.myGalleries).eq(1).click()
        cy.wait(1000)
        cy.get(Locators.Create.pageTitle).should("have.text", "My Galleries")
        cy.get(Locators.Create.galleryTitle).eq(0).click()
        cy.url().should("contain", "/galleries/")
        cy.get("textarea").type(longComment)
        cy.get(Locators.Comment.addComment).eq(2).click()
        cy.get(Locators.Comment.alert).should("have.text", "The body may not be greater than 1000 characters.")
    })
    afterEach("Clear cache", ()=>{
        cy.clearLocalStorage()
    })
})