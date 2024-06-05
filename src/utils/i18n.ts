import { I18n } from "i18n-js";
import { store } from "store/index";

const AVAILABLE_LANGUAGES = [
    'en',
    'he'
]

const RTL_LANGUAGES = [
    'he'
]

const i18n = new I18n({
    en: {
        login: {
            loginTitle: "Log into your account",
            loginSubtitle: "Select your log in method",
            googleLogin: "Login with Google"
        },
        searchBar: "Search for a product, clothing or electronics",
        storeOverview: "Store Overview",
        storeOverviewText: "Total Products in Store: %{count}",
        newProductButton: "Add New Product",
        goToStoreButton: "Go To Store",
        productForm: {
            title: 'Product Name',
            titlePlaceholder: 'Ex: Ninja Grill Bar 3 - White',
            price: 'Price',
            category: 'Categories',
            selectCategory: 'Choose category',
            description: 'Product Description',
            submit: 'Add Product',
        }
    },
    he: {
        login: {
            loginTitle: "התחברות למשתמש",
            loginSubtitle: "בחר את שיטת ההתחברות הרצויה",
            googleLogin: "התחברות עם גוגל",
        },
        searchBar: "חפש שם של מוצר, בגד או מכשיר חשמלי",
        storeOverview: "סקירת חנות",
        storeOverviewText: "סך המוצרים בחנות: %{count}",
        newProductButton: "הוסף מוצר חדש",
        goToStoreButton: "עבור לחנות",
        productForm: {
            title: 'שם המוצר',
            titlePlaceholder: 'דוגמא נינג\'ה גריל בר 3 - לבן',
            price: 'מחיר',
            category: 'קטגוריות',
            selectCategory: 'בחר קטגוריה',
            description: 'תיאור',
            submit: 'הוסף מוצר',
        }
    },
});

i18n.onChange((i18n: I18n) => {
    store.dispatch.app.changeRTLMode(RTL_LANGUAGES.includes(i18n.locale))
})

export function changeLanguage(lang: typeof AVAILABLE_LANGUAGES[number]) {
    i18n.locale = lang;
}

i18n.defaultLocale = "en";
changeLanguage(i18n.defaultLocale)

export default i18n;
// const i18n = new I18n(translations);