/// <reference types="cypress" />
import { RandomNumberGenerator } from "../../dist/domain/random_number_generator";

const seed = Number.parseInt(Cypress.env("SEED"));
const rng = new RandomNumberGenerator(seed);

describe("Random number page", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.log(`Using seed "${seed}"`);
    });

    it("has valid seed", () => {
        expect(isNaN(seed)).to.eq(false);
    });

    it("generates a random number", () => {
        cy.get("pre")
            .invoke("text")
            .should((value) => {
                expect(value).to.eq(rng.random().toString());
            });
    });

    it("assigns a new seed", () => {
        cy.get("input[type='number']")
            .clear()
            .type(`${seed + 1}`);
        cy.get("button").click();
        cy.get("pre")
            .invoke("text")
            .should((value) => {
                rng.seed(seed + 1);
                expect(value).to.eq(rng.random().toString());
            });
    });

    it("assigns a random seed", () => {
        cy.get("input[type='number']").clear();
        cy.get("button").click();
        cy.get("pre")
            .invoke("text")
            .should((value) => {
                expect(Number.isNaN(+value), "input should be a number").to.eq(false);
                expect(value).to.not.eq(rng.random().toString());
            });
    });
});
