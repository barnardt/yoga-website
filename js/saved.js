
// *FUNCTIONS*

// Constructor function for new note / comment
function Note(id,text) {
    this.id = id;
    this.text = text;
}

// Function to display selected saved item
function viewItem(id) {
    let items = JSON.parse(localStorage.getItem("items"));
    let idx = items.findIndex(item => item.id == id);

    let saveDisplay = document.getElementById("saveDisplay");

    saveDisplay.style.display = "none";

    let html = items[idx].html;
    html = html.replace("my-6", "");
    html = html.replace("mt-4", "");

    saveDisplay.innerHTML = 
`
<div class="px-3 py-3 rounded mt-3" id="display">
    ${html}
</div>
`;
    // Animation to fade in selected item
    fadeInDisplay();
}

// Function to remove saved item and update the list of saved items
function deleteItem(id) {

    let items = JSON.parse(localStorage.getItem("items"));
    let idx = items.findIndex(item => item.id == id);

    items.splice(idx,1);

    localStorage.setItem("items", JSON.stringify(items));

    refreshCards();

    document.getElementById("saveDisplay").innerHTML="";

}

// Function to update the display of saved items (cards)
function refreshCards() {
    let cards = document.getElementById("cards");
    cards.innerHTML = "";

    items = JSON.parse(localStorage.getItem("items"));

    if (items.length == 0) {
        cards.innerHTML = `<p id="noItems">There are no saved items to display</p>`;
    }
    else {
        items.forEach(function(item){
            cards.innerHTML +=
`<div class="card border border-light mx-2 my-2 pb-0 pr-0" style="width: 18rem;">
    <div class="card-body pb-0 pr-1">
        <div class="d-flex flex-column h-100">
            <h5 class="card-title font-weight-bold mr-3">${item.title}</h5>
            <p class="card-text mr-3">${item.desc}</p>
            <div class="d-flex justify-content-between mt-auto">
                <a href="#saveDisplay">
                    <button class="btn rounded-0 btn-outline-light text-uppercase mb-3 mr-1"
                            onclick="viewItem('${item.id}')">View item</button>
                </a>
                <button class="btn text-danger mr-1 mb-1 px-0 py-0 align-self-end" 
                        onclick="deleteItem('${item.id}')">
                    <i class="fas fa-trash-alt fa-lg"></i>
                </button>
            </div>
        </div>
    </div>
</div>
`;
    
        });
    }
}

// Function to save a note /comment and display it
function saveNote() {
    let text = document.getElementById("commentForm").value;
    let newNote = new Note(noteID,text);

    notes = JSON.parse(localStorage.getItem("notes"));
    notes.push(newNote);
    localStorage.setItem("notes",JSON.stringify(notes));

    noteID = noteID + 1;

    refreshNotes();
    document.getElementById("commentForm").value = "";
}

// Function to delete a note / comment
function deleteNote(id) {

    notes = JSON.parse(localStorage.getItem("notes"));

    let idx = notes.findIndex(note => note.id == id);
    notes.splice(idx,1);

    localStorage.setItem("notes", JSON.stringify(notes));

    refreshNotes();
}

// Function to update display of saved notes / comments
function refreshNotes() {
    notesDisplay = document.getElementById("notesDisplay");
    notesDisplay.innerHTML = "";
    notes = JSON.parse(localStorage.getItem("notes"));
    notes.forEach(function(note){
        notesDisplay.innerHTML += 
`
<div class="card border border-light mr-2 my-2 pb-0 pr-0" style="max-width: 14.5rem;">
    <div class="card-body pb-0 pr-1 d-flex flex-column h-100">
        <p class="card-text mr-3">${note.text}</p>
        <button class="btn text-danger float-right mr-1 mb-1 px-0 py-0
                        align-self-end mt-auto" 
                onclick="deleteNote('${note.id}')">
            <i class="fas fa-trash-alt fa-lg"></i>
        </button>
    </div>
</div>
`;
    });
}

// *JQUERY*

// Function to animate display of selected saved item (fade in over 1 second)
function fadeInDisplay() {
    $("#saveDisplay").fadeIn(1000);
}


// *PROGRAM*
// Initialise the list of notes and the ID counter 
if (localStorage.getItem("notes") === null) {
    localStorage.setItem("notes", JSON.stringify([]));
    localStorage.setItem("noteID", JSON.stringify(0));
};
let noteID = JSON.parse(localStorage.getItem("noteID"));

// Refresh the display of saved items and notes / comments
refreshCards();
refreshNotes();