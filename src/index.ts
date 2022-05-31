import { parser } from "./syntax.grammar";
import { LRLanguage, LanguageSupport } from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";
import {
  completeFromList,
  Completion,
  CompletionSource,
} from "@codemirror/autocomplete";

export const InlineTokensLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        String: t.string,
        Variable: t.variableName,
      }),
    ],
  }),
  languageData: {},
});

export function inlineTokens(completions: Completion[]) {
  return new LanguageSupport(InlineTokensLanguage, [
    InlineTokensLanguage.data.of({
      autocomplete: autoCompletionList(completions),
    }),
  ]);
}

function autoCompletionList(completions: Completion[]): CompletionSource {
  return completeFromList(completions);
}
