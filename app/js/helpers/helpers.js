export const closeDialog = (dialogElement) =>
    dialogElement.removeAttribute("open");

export const openDialog = (dialogElement) =>
    dialogElement.setAttribute("open", "true");

export const valueNotEmpty = (value) => Boolean(value);

export const addHTMLElement = (container, element) =>
    container.append(element);