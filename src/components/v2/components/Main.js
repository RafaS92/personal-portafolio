import React, { useState } from 'react';
import Navbar from './Navbar';
import { I18nProvider, LOCALES } from '../i18n';
import './Main.css';
import { AppContextProvider } from './context/AppContextProvider';
import V2content from './V2content';
import Footerv2 from './Footerv2';

function Main() {
  const changeLocale = () => {
    setLocale(!locale);
  };

  const [locale, setLocale] = useState(true);

  return (
    <AppContextProvider>
      <I18nProvider
        locale={locale === true ? LOCALES.ENGLISH : LOCALES.SPANISH}
      >
        <Navbar locale={locale} changeLanguage={changeLocale} />
        <V2content locale={locale} />
        <Footerv2 />
      </I18nProvider>
    </AppContextProvider>
  );
}

export default Main;
