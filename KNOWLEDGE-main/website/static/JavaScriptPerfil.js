var contentcontainer = document.getElementById("content-bar")
var container = contentcontainer.getElementsByClassName("resource")

for (var i=0; i<container.length; i++){
    container[i].addEventListener('click', function () {
        var current = document.getElementsByClassName("selected");
        current[0].className = current[0].className.replace(" selected")
        this.className+=" selected"
    })
}

/**************************************************************/


const dropdowns = document.querySelectorAll('.subjects-list');

dropdowns.forEach(dropdown => {

    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const subjects = dropdown.querySelector('.subjects');
    const options = dropdown.querySelectorAll('.subjects li');
    const selected = dropdown.querySelector('.selected-subject');

    select.addEventListener('click', () =>{
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        subjects.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () =>{
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            subjects.classList.remove('menu-open')

            options.forEach(option => {
                option.classList.remove('.active-subject');
            });
            option.classList.add('.active-subject');
        });
    });
});


/*****************************************************************************/

// ScrollReveal({
//     reset: true,
//     distance:'60px',
//     duration: 500,
//     delay:300
// })
//
// ScrollReveal().reveal('.books', {delay: 500, origin: 'left'})
// ScrollReveal().reveal('.video', {delay: 500, origin: 'left'})



/***********************************************************/


const book = document.getElementById("book-btn")
const video = document.getElementById('video-btn')
const links = document.getElementById('course-btn')
const background = document.getElementById('perfil-body-rigth-container')

const book_container = document.createElement("div")
book_container.classList.add('books')

function setBackground(search) {
    if (background.children[0].id === 'books') {
        loadBooksSearch(search)
    } else if(background.children[0].id === 'video') {
        video_add(search)
    }
}

const loadBooksSearch = async (search) => {
    background.innerHTML = ""
    const books = document.createElement('div')
    books.classList.add('books')
    books.setAttribute('id', 'books')
    fetch('https://www.googleapis.com/books/v1/volumes?q="'+search+'"&maxResults=40&key=AIzaSyCv-G53BF19kc3bQktqybib8TOWHDP3nOc')
        .then((res) => {
            return res.json()
        }).then((data) => {
            for (b of data['items']) {
                console.log(b)
                books.innerHTML += `
                    <div class="books-card" >    
                        <a class="title" target="_blank" href="${b['volumeInfo']['previewLink']}" >${b['volumeInfo'].title}</a>
                    </div>
                `
            }
    })
    background.append(books)
}

function click_book() {
    let search = 'Example'
    loadBooksSearch(search).then(r => r);
}
click_book()
book.addEventListener('click', () => {
    click_book()
})
// add_subjects()
// function add_subjects() {
//     subjects = document.getElementById('subjects')
//     subjects.innerHTML = `
//            <input id="dName" value="{{ d.name }}" hidden>
//            <li onclick="click_book()">{{ d.name }}</li>
//     `
// }