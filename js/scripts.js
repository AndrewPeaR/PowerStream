// Список языков
const allLangs = ['ru', 'en']
const select = document.querySelector('select')

// Установка языка по умолчанию. Изначально стоит EN
let currentLang = localStorage.getItem('language') || checkBrowserLang() || 'en'
select.value = localStorage.getItem('language') || checkBrowserLang() || 'en'

const currentPathname = window.location.pathname

let currentTextObject = {}

// Проверяется страница, и из "бд" вытягивается нужный объект с нужными текстами
// алгоритм работы описан тут.
// проверяется наличие html страницы в url
function checkPagePathname() {
    if(currentPathname.includes('/index')){
        currentTextObject = indexPage
        return null
    }
    if(currentPathname.includes('/about')){
        currentTextObject = aboutPage
        return null
    }
    if(currentPathname.includes('/products')){
        currentTextObject = productsPage
        return null
    }
    if(currentPathname.includes('/partners')){
        currentTextObject = partnersPage
        return null
    }
    if(currentPathname.includes('/contact')){
        currentTextObject = contactsPage
        return null
    }
    // Дефолтное значение - страница index
    currentTextObject = indexPage
}
checkPagePathname()

// Подгружаются текста с нужным переводом
function changeLanguage() {
    for (const key in currentTextObject){
        // Тут нужно быть внимательным
        // Если квери селектор не находит элемент, то перевод останавливается
        const elem = document.querySelector(key)
        if(elem)
            elem.innerHTML = currentTextObject[key][currentLang]
    }
}
changeLanguage()

// Обработчик событий, который вызывает смену языка на странице
select.addEventListener('change', () =>{
    // Сохраняется выбранный язык в инпуте
    currentLang = select.value
    // Сохраняется также в локалсторадж (чтобы многостраничный перевод был)
    localStorage.setItem('language', select.value)
    // Меняется язык на сайте или же перерисовываются текста на нужном языке
    changeLanguage()

    // Перезагрузка, чтобы на мобилках закрывалось при выборе языка
    document.querySelector('.burger').classList.remove('active');
    document.querySelector('.header__nav').classList.remove('open')
    location.reload()
})

// Проверяется выбранный язык в браузере, чтобы автоматически подкидывать нужный перевод
function checkBrowserLang() {
    const navLang = navigator.language.slice(0, 2).toLowerCase()
    const result = allLangs.some(elem => {
        return elem === navLang
    })

    if(result)
        return navLang
}