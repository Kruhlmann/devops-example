/// <reference types="cypress" />

const seed = Number.parseInt(process.env.SEED);
let initial_value: string;

describe("Random number page", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("generates a random number", () => {
        cy.get("pre")
            .invoke("text")
            .should((value) => {
                initial_value = value;
                expect(Number.isNaN(+value), "input should be a number").to.eq(false);
            });
    });

    it("assigns a new seed", () => {
        cy.get("input[type='number']").type(`${seed + 1}`);
        cy.get("button").click();
        cy.get("pre")
            .invoke("text")
            .should((value) => {
                expect(value).to.not.eq(initial_value);
            });
    });

    it("assigns a random seed", () => {
        cy.get("input[type='number']").clear();
        cy.get("button").click();
        cy.get("pre")
            .invoke("text")
            .should((value) => {
                expect(Number.isNaN(+value), "input should be a number").to.eq(false);
            });
    });
});
