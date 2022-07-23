#!/usr/bin/env -S deno run -A --allow-read --watch=static/,routes/
import dev from "$fresh/dev.ts";
import * as dotenv from "dotenv";

dotenv.config();

await dev(import.meta.url, "./main.ts");
