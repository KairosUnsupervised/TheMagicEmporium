import { cp, rm } from "node:fs/promises";
// @ts-expect-error
import { compilePack } from "@foundryvtt/foundryvtt-cli";

await rm("build", { recursive: true, force: true });

await Bun.build({
	entrypoints: ["./src/index.ts"],
	outdir: "./build",
});

await cp("./public", "./build", { recursive: true });

await compilePack(
	"./src/compendium/envelopes",
	"./build/compendium/envelopes",
	{ log: true },
);

await compilePack("./src/compendium/wishes", "./build/compendium/wishes", {
	log: true,
});

console.log("Build complete!");
