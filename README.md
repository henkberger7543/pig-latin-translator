# Pig Latin Translator

A small TypeScript-free (pure ESM JavaScript) library that converts English text to Pig Latin by applying consonant-cluster and vowel-initial rules to each word.

## Usage

```js
import { translateWord, translateSentence } from 'pig-latin-translator';

console.log(translateWord('string'));   // "ingstray"
console.log(translateSentence('hello, world!')); // "ellohay, orldway!"
```

## Exports

- `translateWord(word: string): string` — translates a single word.
- `translateSentence(text: string): string` — translates a full sentence, preserving whitespace and punctuation.

## Why

Every English class teaches a slightly different Pig Latin. This library picks one variant and sticks to it: vowel-initial words get a `yay` suffix; words beginning with a consonant or consonant cluster move that cluster to the end and add `ay`. The trade-off is simplicity over exhaustive coverage — there is no special-case dictionary for words like "xray", and no handling of contractions.

## Edges you will hit

- `y` is a vowel only when it follows a consonant (`rhythm` → `ythmrhay`), and a consonant when it leads (`yellow` → `ellowyay`).
- Non-alphabetic tokens — apostrophes, digits, hyphens — are passed through untouched, so `don't` stays `don't`.
- Letter case in the body is preserved (`Hello` → `elloHay`); the suffix is always lowercase.

## Design notes

The window stores values eagerly rather than keeping running aggregates. Running
sums drift with floating point over long streams, and recomputing from a small
buffer is cheap enough that the drift is not worth the speed.

## Limitations

Values are coerced to floats, so very large integers lose precision. If you need
exact integer aggregates over a window, this is the wrong tool.

## Contributing

Issues and pull requests are welcome. Please keep the dependency list empty —
that constraint is the point of the project, not an oversight.

