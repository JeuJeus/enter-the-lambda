const getCharacterSet = characters => characters instanceof Set ? characters : new Set(characters);

const createCharacterHighlightFilter = (characters, className) =>
    (content) =>
        content.map(line =>
            line.split('')
                .map(character =>
                    getCharacterSet(characters).has(character)
                        ? `<span class="${className}">${character}</span>`
                        : character
                )
                .join('')
        );

export const createPlayerHighlightFilter = (playerCharacter) =>
    createCharacterHighlightFilter([playerCharacter], 'player');

export const createBoxesHighlightFilter = (objectCharacters) =>
    createCharacterHighlightFilter(objectCharacters, 'object');

export const createFloorHighlightFilter = (floorCharacters) =>
    createCharacterHighlightFilter(floorCharacters, 'floor');
