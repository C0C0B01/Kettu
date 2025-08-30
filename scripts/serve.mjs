// @ts-nocheck
import chalk from "chalk";
import { readFile } from "fs/promises";
import http from "http";
import os from "os";
import readline from "readline";
import url from "url";
import yargs from "yargs-parser";

import { buildBundle } from "./build.mjs";
import { printBuildSuccess } from "./util.mjs";

const args = yargs(process.argv.slice(2));

export function serve(options) {
    // @ts-ignore
    const server = http.createServer(async (req, res) => {
        const { pathname } = url.parse(req.url || "", true);
        if (pathname?.endsWith(".js")) {
            try {
                const { config, context, timeTook } = await buildBundle();

                printBuildSuccess(
                    context.hash,
                    args.production,
                    timeTook
                );

                res.writeHead(200, { "Content-Type": "application/javascript" });
                res.end(await readFile(config.outfile, "utf-8"));
            } catch {
                res.writeHead(500);
                res.end();
            }
        } else {
            res.writeHead(404);
            res.end();
        }
    }, options);

    server.listen(args.port ?? 4040);

    console.info(chalk.bold.yellowBright("Serving Kettu on:"));

    const netInterfaces = os.networkInterfaces();
    for (const netinterfaces of Object.values(netInterfaces)) {
        for (const details of netinterfaces || []) {
            if (details.family !== "IPv4") continue;
            const port = chalk.green(server.address()?.port.toString());
            console.info(`  http://${details.address}:${port}/bundle.js`);
        }
    }

    return server;
}

const server = serve();

console.log("\nPress Q key or Ctrl+C to exit.");