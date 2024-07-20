import { useState, useEffect } from 'react';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { DictionaryContent } from '@/types/type';

export const useDictionary = (locale: string = "en") => {
  const [dictionary, setDictionary] = useState<DictionaryContent>({});

  useEffect(() => {
    const loadDictionary = async () => {
      const dict = await getDictionary(locale);
      setDictionary(dict);
    };
    loadDictionary();
  }, [locale]);



  const getNestedValue = (key: string): string | DictionaryContent | string[] | DictionaryContent[] | undefined => {
    return key.split('.').reduce((obj, part) => {
      if (obj && typeof obj === 'object' && part in obj) {
        return obj[part];
      }
      return undefined;
    }, dictionary as any);
  };

  const getDictionaryString = (key: string): string => {
    const value = getNestedValue(key);
    if (typeof value === "string") {
      return value;
    }
    return "";
  };


  return { getNestedValue, getDictionaryString };
};
