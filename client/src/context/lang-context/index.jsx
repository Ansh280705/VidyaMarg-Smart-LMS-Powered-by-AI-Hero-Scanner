import { createContext, useEffect, useState } from "react";

export const LangContext = createContext({ lang: "en", t: k=>k, setLang: ()=>{} });

const dict = {
  en: { explore: "Explore Courses", mycourses: "My Courses", signout: "Sign Out", downloads: "Downloads", scan: "Scan", chat: "Chat" },
  hi: { explore: "पाठ्यक्रम देखें", mycourses: "मेरे कोर्स", signout: "साइन आउट", downloads: "डाउनलोड", scan: "स्कैन", chat: "चैट" }
};

export default function LangProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  useEffect(()=>localStorage.setItem("lang", lang),[lang]);
  const t = (k) => (dict[lang] && dict[lang][k]) || k;
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}
