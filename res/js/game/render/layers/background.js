const seededPseudoRandom = (x, y, seed) => {
    //necessary for deterministic star field generation
    const hash = Math.sin(x * 12.9898 + y * 78.233 + seed * 43.614) * 43758.5453;
    return hash - Math.floor(hash);
};

const noStarShouldAppear = (starDensity, config) => starDensity > config.STYLE.BACKGROUND.STAR_DENSITY_UPPER_TRESHOLD;

const getStarDefinitions = stars => [
    {char: stars.SMALL.char, prob: stars.SMALL.probability},
    {char: stars.MEDIUM.char, prob: stars.MEDIUM.probability},
    {char: stars.LARGE.char, prob: stars.LARGE.probability}
];

const getTotalProbability = starDefinitions => starDefinitions
    .reduce((sum, starDefinition) => sum + starDefinition.prob, 0);

const getStarMatchedByThreshold = (cumulativeThresholds, randomValue) =>
    cumulativeThresholds.find(item =>
        randomValue < item.threshold) || cumulativeThresholds[cumulativeThresholds.length - 1];

const selectStarSizeByProbability = (randomValue, stars) => {
    const starDefinitions = getStarDefinitions(stars);
    const totalProbability = getTotalProbability(starDefinitions);

    const cumulativeThresholds = starDefinitions
        .map(starDefinition => ({char: starDefinition.char, weight: starDefinition.prob / totalProbability}))
        .reduce((acc, {char, weight}) => {
            const previousThreshold = acc.length ? acc[acc.length - 1].threshold : 0;
            return acc.concat({char, threshold: previousThreshold + weight});
        }, []);

    return getStarMatchedByThreshold(cumulativeThresholds, randomValue).char;
};

const getStarAtPosition = (x, y, config) => {
    const starDensity = seededPseudoRandom(x, y, 1);

    if (noStarShouldAppear(starDensity, config)) return config.STYLE.UNICODE.AIR;

    const sizeRandom = seededPseudoRandom(x, y, 2);
    return selectStarSizeByProbability(sizeRandom, config.STYLE.BACKGROUND.STARS);
};

const getBackgroundCharAt = (x, y, config) => getStarAtPosition(x, y, config);

export const getBackgroundLine = (lineIndex, score, width, config) => {
    const parallaxOffset = Math.floor(score * config.STYLE.BACKGROUND.PARALLAX_FACTOR);
    return Array.from({length: width}, (_, x) =>
        getBackgroundCharAt(x + parallaxOffset, lineIndex, config)
    ).join('');
};

