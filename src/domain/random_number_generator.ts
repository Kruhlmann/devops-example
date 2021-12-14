export class RandomNumberGenerator {
    protected internal_seed: number;

    public constructor(seed?: number) {
        if (seed) {
            this.internal_seed = seed;
        }
    }

    public seed(seed: number): void {
        this.internal_seed = seed;
    }

    // Reference: https://en.wikipedia.org/wiki/Jenkins_hash_function
    public random(): number {
        let seed = this.internal_seed;
        seed = (seed + 0x7ed55d16 + (seed << 12)) & 0xffffffff;
        seed = (seed ^ 0xc761c23c ^ (seed >>> 19)) & 0xffffffff;
        seed = (seed + 0x165667b1 + (seed << 5)) & 0xffffffff;
        seed = ((seed + 0xd3a2646c) ^ (seed << 9)) & 0xffffffff;
        seed = (seed + 0xfd7046c5 + (seed << 3)) & 0xffffffff;
        seed = (seed ^ 0xb55a4f09 ^ (seed >>> 16)) & 0xffffffff;
        return (seed & 0xfffffff) / 0x10000000;
    }

    public random_seed(): number {
        return Math.floor(Math.random() * 0xffffffff);
    }
}
