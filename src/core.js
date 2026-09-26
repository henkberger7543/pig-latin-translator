/**
 * A word is considered alphabetic if every character is in [a-zA-Z].
 *
 * This excludes apostrophes, hyphens, and accented letters. Pig Latin is an
 * English-language game; non-English characters don't have a stable rule. We
 * leave such words untouched rather than guessing.
 */
function isAlphabeticWord(word) {
  return /^[a-zA-Z]+$/.test(word);
}

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);
const Y_IS_VOWEL_IF_AFTER_CONSONANT = true;

/**
 * Returns the index of the first vowel in `lowerWord`, or `lowerWord.length`
 * if no vowel is found.
 *
 * 'y' is treated as a vowel when it appears after at least one consonant
 * ("rhythm" -> vowel at position 4, "my" -> vowel at position 1). This matches
 * the most common classroom Pig Latin variant.
 */
function firstVowelIndex(lowerWord) {
  for (let i = 0; i < lowerWord.length; i++) {
    const c = lowerWord[i];
    if (VOWELS.has(c)) return i;
    if (c === 'y' && Y_IS_VOWEL_IF_AFTER_CONSONANT) {
      if (i > 0) return i;
      // Leading 'y' is a consonant ("yellow" -> "ellowyay").
    }
  }
  return lowerWord.length;
}

/**
 * Translates a single alphabetic word to Pig Latin.
 *
 * Rules applied:
 *   - Word starts with a vowel: append "yay" ("apple" -> "appleyay").
 *   - Word starts with a consonant cluster: move the cluster to the end and
 *     add "ay" ("string" -> "ingstray").
 *   - Word has no vowel (e.g. "my" with leading 'y', or an all-consonant
 *     string like "tsk"): treat as a consonant-only word, append "ay"
 *     ("tsk" -> "tskay").
 *
 * Letter case of the untranslated portion is preserved exactly. The suffix is
 * always lowercase.
 */
function translateWord(word) {
  if (typeof word !== 'string' || word.length === 0) return word;
  if (!isAlphabeticWord(word)) return word;

  const lower = word.toLowerCase();
  const firstVowel = firstVowelIndex(lower);

  if (firstVowel === 0) {
    return word + 'yay';
  }

  const prefix = word.slice(0, firstVowel);
  const rest = word.slice(firstVowel);
  return rest + prefix + 'ay';
}

/**
 * Splits `text` into tokens, where each token is either a run of whitespace,
 * a run of word characters, or a single non-word, non-whitespace character.
 * Order is preserved.
 *
 * Whitespace is preserved verbatim so that the translated output has the same
 * inter-word spacing as the input. Multiple spaces, tabs, and newlines all
 * survive the round trip.
 */
function tokenize(text) {
  const tokens = [];
  let i = 0;
  while (i < text.length) {
    const c = text[i];
    const isSpace = /\s/.test(c);
    const isWord = /[a-zA-Z]/.test(c);
    let j = i;
    if (isSpace) {
      while (j < text.length && /\s/.test(text[j])) j++;
    } else if (isWord) {
      while (j < text.length && /[a-zA-Z]/.test(text[j])) j++;
    } else {
      j = i + 1;
    }
    tokens.push(text.slice(i, j));
    i = j;
  }
  return tokens;
}

/**
 * Translates `text` to Pig Latin.
 *
 * Each maximal run of letters is treated as a word. Non-alphabetic tokens
 * (apostrophes, digits, punctuation, hyphens) are passed through untouched,
 * so "hello, world!" becomes "ellohay, orldway!". Whitespace between tokens is
 * preserved exactly.
 */
function translateSentence(text) {
  if (typeof text !== 'string') return text;
  return tokenize(text)
    .map((tok) => (/[a-zA-Z]/.test(tok) ? translateWord(tok) : tok))
    .join('');
}

export { translateWord, translateSentence };
