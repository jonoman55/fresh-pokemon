import { Evt, StatefulEvt } from "https://deno.land/x/evt@v2.2.1/mod.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState, useEffect } from "preact/hooks";

import { Pokemon } from "./types.ts";

const evtList = new StatefulEvt<Pokemon[]>([]);

if (IS_BROWSER) {
    evtList.post(JSON.parse(window.localStorage.getItem("list") ?? "[]"));

    // deno-lint-ignore no-explicit-any
    evtList.attach((list: any) => {
        window.localStorage.setItem("list", JSON.stringify(list));
    });
}

export default function useList(): [Pokemon[], (pokemon: Pokemon) => void] {
    const [list, setList] = useState(evtList.state);
    useEffect(() => {
        const ctx = Evt.newCtx();
        evtList.attach(ctx, setList);
        return () => {
            evtList.detach(ctx);
        };
    }, []);

    return [
        list,
        (pokemon: Pokemon) => {
            console.log("Did add pokemon", pokemon);
            evtList.post([...list, pokemon]);
        },
    ];
}