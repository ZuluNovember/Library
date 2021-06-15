let myLibrary = [new Book("Thus Spoke Zarathustra", "Friedrich Nietzche", 258, false)];
//Example Book
displayBook();

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//Popup
document.getElementById('add-book').addEventListener('click', displayForm);
document.querySelector('.outer').addEventListener('click', hideForm);
document.getElementById('form-send').addEventListener('click', addBookToLibrary)

//Book controls
let readButton = document.querySelector('.read-radio');
readButton.addEventListener('change', markAsRead);
const removeBookButton = document.querySelector('#remove-book-button');
removeBookButton.addEventListener('click',removeBook);



function addBookToLibrary() {
    getBook();
    displayBook();
    clearForm();
}

function getBook() {
    let title = document.getElementById('form-title').value;
    let author = document.getElementById('form-author').value;
    let pages = document.getElementById('form-pages').value;
    let read = document.getElementById('form-read').checked;

    myLibrary.unshift(new Book(title, author, pages, read));
}

function displayBook() {

    let bookDivs = document.querySelectorAll(".book");
    for (let i = 0; i < bookDivs.length; i++) {
        bookDivs[i].parentNode.removeChild(bookDivs[i]);
    }

    let docFrag = new DocumentFragment();
    for (let i = 0; i < myLibrary.length; i++) {
        let tempNode = document.querySelector("[data-type='template']").cloneNode(true);
        tempNode.querySelector("#title").textContent = myLibrary[i].title;
        tempNode.querySelector("#author").textContent = myLibrary[i].author;
        tempNode.querySelector("#page-num").textContent = myLibrary[i].pages;
        tempNode.querySelector(".read-radio").checked = myLibrary[i].read;
        tempNode.classList.add('book');
        tempNode.dataset.index= `${i}`;
        tempNode.style.display = "block";
        tempNode.querySelector('.read-radio').addEventListener('change',markAsRead)
        docFrag.appendChild(tempNode);
    }
    let bookContainer = document.querySelector('.card-container');
    bookContainer.insertBefore(docFrag, bookContainer.firstChild);
}

function displayForm() {
    let popup = document.querySelector('.popup');
    popup.classList.add("open");
}

function hideForm() {
    let popup = document.querySelector('.popup');
    popup.classList.remove("open")
}

function clearForm() {
    document.getElementById('form-form').reset();
    document.querySelector('.popup').classList.remove('open')
}

function markAsRead(e){
    let index = e.target.parentNode.parentNode.parentNode.parentNode.dataset.index;
    myLibrary[index].read = e.target.checked;
}

function removeBook(e){
    const index = e.target.parentNode.parentNode.parentNode.parentNode.dataset.index;
    myLibrary.splice(index,1)
    displayBook()
}