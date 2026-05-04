import {cp, rm} from "node:fs/promises";
import {homedir} from "node:os";
import {namespace} from "@tme/shared/src/namespaceConfig.ts";

import "./build.ts";

const moduleFolder = `${homedir()}/.local/share/FoundryVTT/Data/modules/${namespace.core.id}`;

await rm(moduleFolder, {recursive: true, force: true});
await cp("./build", moduleFolder, {recursive: true});

console.log("Deployed!");


