import {cp, rm} from "node:fs/promises";

await rm("build", {recursive: true, force: true});

await Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './build',
});

await cp("./public", "./build", {recursive: true});

console.log("Build complete!");


