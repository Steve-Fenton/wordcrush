/**
 * Soundex encoding
 * https://www.ics.uci.edu/~dan/genealogy/Miller/javascrp/soundex.htm
 * Disregard special characters and the letters A, E, I, O, U, W, Y, and H.
 */
const encoding = {
    B:	1,
    C:	2,
    D:	3,
    F:	1,
    G:	2,
    J:	2,
    K:	2,
    L:	4,
    M:	5,
    N:	5,
    P:	1,
    Q:	2,
    R:	6,
    S:	2,
    T:	3,
    V:	1,
    X:	2,
    Z:	2
}

/**
 * 
 * @param {string} input 
 * @returns {string}
 */
export function soundex(input) {
    const text = normalizeText(input);

    return getSoundex(text).join('');
}

function normalizeText(input) {
    let text = [];
    
    // Remove double-letters
    for (let i = 0; i < input.length; i++) {
        const letter = input[i].toUpperCase();
        if (text[i - 1] == letter) continue;
        text.push(letter);
    }

    return text;
}

function getSoundex(text) {
    // The first letter is always left alone
    const chars = [];
    chars[0] = text.shift();

    // The other letters are encoded to numbers
    for(let c of text) {
        const val = encoding[c] ?? '';

        if (val && chars[chars.length -1] !== val) chars.push(val);

        // A soundex are limited to 4 characters
        if (chars.length >= 4) break;
    }

    // A soundex must be 4 characters
    return padSoundex(chars);
}

function padSoundex(chars) {
    // Pad right with zeros
    for (let i = chars.length; i < 4; i++) {
        chars.push('0');
    }

    return chars;
}