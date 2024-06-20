// import 'server-only'
import { DictionaryContent } from '@/types/type'

interface Dictionary {
  [locale: string]: () => Promise<DictionaryContent>;
}

const dictionaries: Dictionary = {
  en: () => import('./en.json').then(module => module.default as DictionaryContent),
  am: () => import('./am.json').then(module => module.default as DictionaryContent),
}

export const getDictionary = async (locale: string): Promise<DictionaryContent> => {
  const loadDictionary = dictionaries[locale];
  if (!loadDictionary) {
    throw new Error(`Locale '${locale}' is not supported`);
  }
  return loadDictionary();
}
