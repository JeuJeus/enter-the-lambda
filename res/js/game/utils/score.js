export const getHighScore = (key) => parseInt(localStorage.getItem(key) || '0', 10);

export const saveNewScore = (key, score) => {
    if (score <= getHighScore(key)) return;
    localStorage.setItem(key, score);
};

export const getNextScore = (field) => field.score + 1;
