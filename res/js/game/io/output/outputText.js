import {composeFilters, getOutputFilters} from "./filter/filter.js";

const display = document.getElementById('terminal');

export const setDisplayContent = (screenContent) => {
    const filteredContent = composeFilters(getOutputFilters())(screenContent);
    display.innerHTML = filteredContent.join('\n');
};