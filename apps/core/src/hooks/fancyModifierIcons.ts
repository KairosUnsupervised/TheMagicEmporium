import {namespace} from "@tme/shared/src/namespaceConfig.ts";

/**
 * Renders modifiers icons on character sheets without the gold border and background
 */
export const registerFancyModifierIcons = () => {

    window.Hooks.on("renderActorSheetV2", (_sheet: unknown, html: HTMLElement, _document: unknown, _token: unknown) => {

        const img = html.querySelectorAll("img")

        img.forEach((img) => {
            if (img.src.includes(`worlds/${game.world.id}/data/${namespace.core.id}/icons/modifiers`)) {
                img.classList.remove("gold-icon")
            }
        })
    })

}
