import { createI18n } from 'vue-i18n';

import en from './en';
import ja from './ja';

// -----------------------------------------------------------------------------
// LOCALIZATION
// ----------------------------------------------------------------------------

export default createI18n({
    locale: 'ja',
    fallbackLocale: 'en',
    messages: { en, ja, },
});
