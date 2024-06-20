import { useState, useEffect } from 'react';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { DictionaryContent } from '@/types/type';

export const useDictionary = (locale: string): DictionaryContent => {
  const [dictionary, setDictionary] = useState<DictionaryContent>({});

  useEffect(() => {
    const loadDictionary = async () => {
      const dict = await getDictionary(locale);
      setDictionary(dict);
    };
    loadDictionary();
  }, [locale]);

  return dictionary;
};
