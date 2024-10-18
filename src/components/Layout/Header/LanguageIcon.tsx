import { useState } from "react";
import { useTranslation } from "react-i18next";
function LanguageIcon() {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(language);

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "pt" : "en";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  };
  
  return (
    <div style={{ color: "#000" }}>
      <button type="button" onClick={handleChangeLanguage}>
        Change Language
      </button>
    </div>
  );
}
export default LanguageIcon;
