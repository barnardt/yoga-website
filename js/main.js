// *FUNCTIONS*

// Constructor function to create new saved item
function Item(id,title,desc,html) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.html = html;
}

// Function that runs when save button (thumbtack) is clicked
function startSave(event) {
    saveID = event.currentTarget.id.substring(4);

    items = JSON.parse(localStorage.getItem("items"));

    // If the item is a picture, we want to keep only the outer HTML
    let deep = true;
    if (saveID.includes("Pic")) {
        deep = false;
    };

    if (items.some(item => item.id == saveID)) {
        alert("This item has already been saved.");
    }
    else {
        $("#saveModal").modal('show');
        html = document.getElementById(saveID).cloneNode(deep).outerHTML;
    }

    document.getElementById("saveTitle").value = `${saveID}`;
    document.getElementById("saveDesc").value = "";
}

// Function to actually save an item with title and description
function saveItem() {
    newItem = new Item(
        saveID,
        document.getElementById("saveTitle").value,
        document.getElementById("saveDesc").value,
        html
    );

    items = JSON.parse(localStorage.getItem("items"));
    items.push(newItem);
    localStorage.setItem("items", JSON.stringify(items));
    
    alert(
`Item saved successfully.

You have saved ${items.length} items.`
    );
}

// Function to resize lotus image
function resizeLotus() {

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let lotus = document.getElementById("introImgWrapper");

    if (vw < 992) {
        let firstCont = document.getElementById("firstCont");
        let firstContHeight = getComputedStyle(firstCont).height;
        firstContHeight = parseInt(firstContHeight);

        let headTextWrap = document.getElementById("headTextWrap");
        let headTextWrapHeight = getComputedStyle(headTextWrap).height;
        headTextWrapHeight = parseInt(headTextWrapHeight);

        let newHeight = (firstContHeight - headTextWrapHeight);
        
        lotus.style.height = newHeight.toString() + "px";
        lotus.style.width = (newHeight*0.8465).toString() + "px";
    }
    else {
        lotus.style.height = "100vh";
        lotus.style.width = "84.65vh";
    }

}

// Function to add a link to an element as a wrapper if viewport is smaller than 992
function addLink(elementID, link) {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

    if (vw < 992) {
        let element = document.getElementById(elementID);

        let wrapper = document.createElement("a");
        wrapper.href = link;
        
        let parent = element.parentNode;
        parent.replaceChild(wrapper, element);

        wrapper.appendChild(element);
    }
}

// *JQUERY*
$(document).ready(function(){

    // Add internal links to page sections if content is displayed vertically on page load
    // addLink("originsLearnMoreBtn", "#originsCol");
    // addLink("exerciseLearnMoreBtn", "#exerciseCol");


    // Display the main picture correctly sized on page load
    resizeLotus();

    // Bootstrap 4 requires this for tooltips to work
    $('[data-toggle="tooltip"]').tooltip();

    // Toggle show / hide for like buttons (hearts) between regular and solid
    $('.like').click(function(){
        $(this).children('*').toggle();
    });
});

// *PROGRAM*
// Initialise variables we need across functions
let saveID = "";
let html = "";

// Add event listeners to run startSave() function when thumbtacks are clicked
let tacks = document.querySelectorAll(".tack");
tacks.forEach(function(tack){
    tack.addEventListener("click", function(){startSave(event);});
});

// Get saveForm element
let saveForm = document.getElementById("saveForm");

// Add event listener to save button in modal
let saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", function(){saveItem();});

// Initialise the list of saved items
if (localStorage.getItem("items") === null) {
    localStorage.setItem("items", JSON.stringify([]));
};

// Add event listeners to body element when page is resized
window.addEventListener("resize", function(){resizeLotus()});
// window.addEventListener("resize", function(){addLink("originsLearnMoreBtn", "#originsCol")});
// window.addEventListener("resize", function(){addLink("exerciseLearnMoreBtn", "#exerciseCol")});