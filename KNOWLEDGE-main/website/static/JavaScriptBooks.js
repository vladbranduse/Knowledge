const container = document.getElementById('perfil-body-rigth-container');
const dataSearch = document.getElementById('searchBook')

let books = []
dataSearch.addEventListener('keyup', (e) => {
    const text = e.target.value.toLowerCase()
    books = loadBooksSearch(document.getElementById('searchBook').value)
    const filteredbooks = books['items'].filter((book) => {
        return (
            book['volumeInfo'].title.toLowerCase().includes(text)
        );
    });
    displayBooks(filteredbooks)
});

const displayBooks = (books) => {
    console.log(books)
    container.innerHTML = books.map((book) => {
        return `
            <div class="books">
                <img src="${book['volumeInfo']['imageLinks'].smallThumbnail}"  alt="">
                <div class="tittle_price">
                    <a href="#" class="title">${book['volumeInfo'].title}</a>
                    <a href="${book['volumeInfo']['previewLink']}" target="_blank" class="title">Read</a>
                </div>
            </div>
        `;
    }).join('')
}


const loadBooksSearch = async (search) => {
    try{
        const res = await fetch('https://www.googleapis.com/books/v1/volumes?q="'+search+'"&maxResults=40&key=AIzaSyC99Jnk-A_S19piu81aC2f5ZZUiM3dsJdo')
        books = await res.json()
        displayBooks(books['items'])
    } catch (e) {
        console.error(e)
    }
}


const loadBooks = async () => {
    try{
        const res = await fetch('https://www.googleapis.com/books/v1/volumes?q=?*&maxResults=40&key=AIzaSyC99Jnk-A_S19piu81aC2f5ZZUiM3dsJdo')
        books = await res.json()
        displayBooks(books['items'])
    } catch (e) {
        console.error(e)
    }
}
loadBooks();
//
//
//
//
// function getBooks(){
//     search = document.getElementById('searchBook').value
//     document.getElementById('output').innerHTML=""
//     output = document.getElementById('output')
//     // fetch('https://openlibrary.org/search.json?q='+search+'')
//     // .then(
//     //     res => res.json()
//     // ).then(
//     //     response => {
//     //         console.log(response['docs'].length)
//     //         for (var i = 0; i < response['docs'].length; i++) {
//     //             output.innerHTML += "<h1>" + response['docs'][i]['title'] + "</h1>"
//     //         }
//     //     }
//     // )
//     // 683619038954-169aict58fp690abvo9t90dqo0tt8hm4.apps.googleusercontent.com
//     fetch('https://www.googleapis.com/books/v1/volumes?q='+search+'&maxResults=40&key=AIzaSyC99Jnk-A_S19piu81aC2f5ZZUiM3dsJdo').then(
//         res => res.json()
//     ).then(
//
//         response => {
//             console.log(response['totalItems'])
//             for (var i = 0; i < response['totalItems']; i++) {
//                 console.log(response['items'].length)
//                 output.innerHTML += "<h1>" + response['items'][i]['volumeInfo']['title'] + "</h1>"
//             }
//         }
//     )
//
// }