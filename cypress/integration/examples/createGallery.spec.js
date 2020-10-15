const Locators = require("../../fixtures/Locators.json")
import { authCreate } from "../../page_objects/createGalleryObject"

describe ("Create gallery testing", ()=>{

    let correctEmail = "markojevtic192@gmail.com"
    let correctPassword = "123456789"
    let title = "Random title"
    let desc = "random description"
    let imgUrl = "https://www.personal.psu.edu/acr5332/Image.jpg"
    let imgUrl2 = "https://media.wired.com/photos/593261cab8eb31692072f129/master/pass/85120553.jpg"
    let imgUrl3 = "https://cdn.mos.cms.futurecdn.net/2Gwau7TtiHM5PdsjFeaxnm-320-80.jpg"

    beforeEach("Login user", ()=>{
        cy.Login(correctEmail, correctPassword)
        cy.get(Locators.Login.Logout).eq(3).should("be.visible")
        cy.get(Locators.Create.createPage).eq(2).click()
        cy.url().should("contain", "/create")
        cy.get(Locators.Create.pageTitle).should("have.text", "Create Gallery")
    })
    it("create gallery using DOM", ()=>{
        authCreate.createGallery(title,desc,imgUrl2)
    })
    it.only("Creating gallery", ()=>{
        cy.CreateGallery(title, desc, imgUrl2)
    })
    it("Create gallery without title", ()=>{
        cy.get(Locators.Create.description).type(desc)
        cy.get(Locators.Create.img).eq(2).type(imgUrl)
        cy.get(Locators.Create.submit).eq(0).click()
        cy.get(Locators.Create.title).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("Create gallery without description", ()=>{
        cy.get(Locators.Create.title).type(title)
        cy.get(Locators.Create.img).eq(2).type(imgUrl)
        cy.get(Locators.Create.submit).eq(0).click()
        cy.get(Locators.Create.pageTitle).should("have.text", "All Galleries")
    })
    it("Create gallery without image url", ()=>{
        cy.get(Locators.Create.title).type(title)
        cy.get(Locators.Create.description).type(desc)
        cy.get(Locators.Create.submit).eq(0).click()
        cy.get(Locators.Create.img).eq(2).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("Create gallery with 4 images", ()=>{
        cy.get(Locators.Create.title).type(title)
        cy.get(Locators.Create.description).type(desc)
        cy.get(Locators.Create.img).eq(2).type(imgUrl2)
        cy.get("button").not(".btn").eq(2).click()
        cy.get(Locators.Create.img).eq(3).type(imgUrl)
        cy.get("button").not(".btn").eq(6).click()
        cy.get(Locators.Create.img).eq(4).type(imgUrl3)
        cy.get("button").not(".btn").eq(9).click()
        cy.get(Locators.Create.img).eq(5).type(imgUrl)
        cy.get(Locators.Create.submit).eq(0).click()
        cy.get(Locators.Create.myGalleries).eq(1).click()
        cy.get(Locators.Create.galleryTitle).eq(0).click()
        cy.get(".carousel-item").should("have.length", 4)
    })
    it("Cancel creation of gallery", ()=>{
        cy.get(Locators.Create.cancel).eq(1).click()
        cy.get(Locators.Create.pageTitle).should("have.text", "All Galleries")
    })
    it("Add 3 image urls, delete last one before submit", ()=>{
        cy.get(Locators.Create.title).type(title)
        cy.get(Locators.Create.description).type(desc)
        cy.get(Locators.Create.img).eq(2).type(imgUrl)
        cy.get("button").not(".btn").eq(2).click()
        cy.get("button").not(".btn").eq(6).click()
        cy.get(Locators.Create.img).eq(3).type(imgUrl)
        cy.get(".form-control").should("have.length", 5)
        cy.get(Locators.Create.deleteImg).eq(6).click()
        cy.get(".form-control").should("have.length", 4)
        cy.get(Locators.Create.submit).eq(0).click()
    })
    it("Rearrange img urls before creating gallery", ()=>{
        cy.get(Locators.Create.title).type(title)
        cy.get(Locators.Create.description).type(desc)
        cy.get(Locators.Create.img).eq(2).type(imgUrl2)
        cy.get("button").not(".btn").eq(2).click()
        cy.get(Locators.Create.img).eq(3).type(imgUrl)
        cy.get("button").not(".btn").eq(6).click()
        cy.get(Locators.Create.img).eq(4).type(imgUrl3)
        cy.get(Locators.Create.moveButton).eq(2).click()
        cy.get(Locators.Create.moveButton).eq(7).click()
        cy.get(Locators.Create.submit).eq(0).click()
        cy.get(Locators.Create.pageTitle).should("have.text", "All Galleries")
    })
    it("Title with more than 255 characters", ()=>{
        cy.get(Locators.Create.title).type("OF6yvNuNzoVSGRqZScSWk9i94TtjoIKPDG3p7AZljuz9RSsFwjZU5VfCfasFxKfoBo9CKnfZy33HQatnflTrERxzDw8HLiq34AnIgWT248zvWvRannkGf74aYNsCDlTPU0rMUuNvWMgoOMZSGHV4MiAO6fPbcwDVAYuFjRFjez1H43pSFWdHsdKWsqRu01yQk8vkMv1zc5emtxFYofmrO5dlrgddRSMXsQbfXhauoX8saoyfrUTnccjb3rzk7yn4")
        cy.get(Locators.Create.description).type(desc)
        cy.get(Locators.Create.img).eq(2).type(imgUrl2)
        cy.get(Locators.Create.submit).eq(0).click()
        cy.get(Locators.Create.alert).should("be.visible").and("have.text","The title may not be greater than 255 characters.")
    })
    it("Title with less than 2 characters", ()=>{
        cy.get(Locators.Create.title).type("1")
        cy.get(Locators.Create.img).eq(2).type(imgUrl2)
        cy.get(Locators.Create.submit).eq(0).click()
        cy.get(Locators.Create.alert).should("be.visible").and("have.text", "The title must be at least 2 characters.")
    })
    it("Description with more than 1000 characters", ()=>{
        cy.get(Locators.Create.title).type(title)
        cy.get(Locators.Create.description).type("Yl0STiBUq2IEye5s8KM0ZIrOeEWqtXHC1aI90zl9RMueYlzeqP4XwEgzZmp7Z5cHDd2cTBJZ3MYpRhao4gygJiM0FItqxnQphIK8on9ZS2DP6QMaCnDs8aTZqVOQuyCJWpk4LJBXjqxyMcM23memZ6paSPfCIud6LGKmd9ESAcMKL8Z125qKtC77JVrscj82v23l5AkYohsW9oKgfqvs9Ayu9do8CzLpEl3BT0jT1W0SRPLUxq6GcwY71IvN0D8N3IrSgs2wRwx9hVyCMvHnfD97dj1XR1D2yqveqBLRccOeL3cB7eCJPF8lBvYPpnmVE7Sfj4vVctT9vdEdU6xR3zcsgjnGalzMHIW6rxYkDg7cN97qnqi0wOsfWqL54W9fsQ4gM1WWoEgisTo2BSkdBjxfYSdG7YQpn6cAqacLKNY0PNQs7HpbinobI4tlArz5RzN6EAhj5ShIsB1VDO3Uq1r7dvIyUCz61NolD1wecxktiFUBWzBH6I2031byGF4EtrGSFXc060TmpUr8R8aGRwIeUmvRcvht6Dx8mWZBClXhiidggIZqnS0rlUBxt2C0yCLj6JwZ5hRJ1zcTOVZTSvpWrvhLSoDWW7LQPxko8lYTraz6C4ySFhh29fpij7LWfzCs42tScA4efQIjwYU9w1vpaBEZaO07hIwZgsscHg1aOiTJKbRh8M2M4kghjCj9GjmhH3mMLyLD00VPwCZh0uyfknikeGPrTM9PKvLFayhGjh34KtKuQmbvLz8CkjreVskpkiv9cYUvxvQDgTR75M0Pg7CAURZil3sdPpKhG9U8CSSTimNDQIzIB1Vii57niQMZAjMGEmQawa0c4BycSETo383s9i3A2ftC2gz466IB4Stdc7BYDUqDA4WWGoLIRLJfVaH5jleQnitBVSDifrTNEUlUGGEfBxPTrRskIBqd58Vy2thnT8XBGvdLgzFltA9OWMq0mZCe8lj0Hfp1gZ3qgTuRPj76EGSq2Tqhh")
        cy.get(Locators.Create.img).eq(2).type(imgUrl2)
        cy.get(Locators.Create.submit).eq(0).click()
        cy.get(Locators.Create.alert).should("be.visible").and("have.text", "The description may not be greater than 1000 characters.")
    })
    it("Wrong image format", ()=>{
        cy.get(Locators.Create.title).type(title)
        cy.get(Locators.Create.img).eq(2).type("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR97MdbZBSV0Gi73A1hjopsxGdbODTbytm4iA&usqp=CAU")
        cy.get(Locators.Create.submit).eq(0).click()
        cy.get(Locators.Create.alert).should("be.visible").and("have.text", "Wrong format of image")
    })
    afterEach ("Clear cache", ()=>{
        cy.clearLocalStorage()
    })


})