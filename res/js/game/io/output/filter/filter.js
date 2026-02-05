const filters = [];

export const composeFilters = (filters) => (content) =>
    filters.reduce((filtered, filter) => filter(filtered), content);

export const addOutputFilter = (filter) => {
    filters.push(filter);
};

export const getOutputFilters = () => filters;
