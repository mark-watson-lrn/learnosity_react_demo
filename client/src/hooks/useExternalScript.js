import { useEffect, useState } from "react";
import { QuizListener } from "../utils/ItemApiListener";

export const useExternalScript = (url, authentication) => {

    let [state, setState] = useState(url ? "loading" : "idle");

    useEffect(() => {
        if (!url) {
            setState("idle");
            return;
        }
        let script = document.querySelector(`script[src="${url}"]`);

        const handleScript = (e) => {
            setState(e.type === "load" ? "ready" : "error");
        };

        if (!script) {
            script = document.createElement("script");
            script.type = "application/javascript";
            script.src = url;
            script.async = true;
            document.body.appendChild(script);
            script.addEventListener("load", handleScript);
            script.addEventListener("error", handleScript);
        }

            script.addEventListener("load", handleScript);
            script.addEventListener("error", handleScript);

            const myListener = async () => { 
                let quiz = QuizListener(authentication);

                let result = await quiz;
                return (result);
            }

            myListener();

        return () => {
            script.removeEventListener("load", handleScript);
            script.removeEventListener("error", handleScript);
        };

    }, [url, authentication]);

    return state;
};