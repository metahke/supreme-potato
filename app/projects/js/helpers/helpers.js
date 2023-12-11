import {ELEMENTS} from "../elements/elements.js";

export const closeDialog = (dialogElement) =>
    dialogElement.setAttribute("open", "false");

export const openDialog = (dialogElement) =>
    dialogElement.setAttribute("open", "true");

export const valueNotEmpty = (value) => Boolean(value);

export const addHTMLElement = (container, element) =>
    container.append(element);