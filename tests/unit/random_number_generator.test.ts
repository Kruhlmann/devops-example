import { RandomNumberGenerator } from "../../src/domain";

describe("Random number generator", () => {
    it("generates number", () => {
        const rng = new RandomNumberGenerator();
        const result = rng.random();
        expect(typeof result).toBe("number");
    });

    it("generates the same number with the same seed", () => {
        const rng = new RandomNumberGenerator();
        rng.seed(0);
        expect(rng.random()).toBe(rng.random());
    });

    it("generates different numbers with different seeds", () => {
        const rng = new RandomNumberGenerator();
        rng.seed(0);
        const result1 = rng.random();
        rng.seed(1);
        const result2 = rng.random();
        expect(result1).not.toBe(result2);
    });
});
