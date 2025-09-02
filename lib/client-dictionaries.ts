// Client-side dictionary loader (without server-only restriction)

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  ar: () => import("./dictionaries/ar.json").then((module) => module.default),
}

export const getClientDictionary = async (locale: "en" | "ar") => 
  dictionaries[locale]?.() ?? dictionaries.en()
