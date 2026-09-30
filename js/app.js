const noteForm = document.getElementById("noteForm");
const noteInput = document.getElementById("noteInput");
const notesList = document.getElementById("notesList");

let notes = JSON.parse(
    localStorage.getItem("quicknotes")
) || [];

function saveNotes() {
    localStorage.setItem(
        "quicknotes",
        JSON.stringify(notes)
    );
}

function renderNotes() {
    notesList.innerHTML = "";

    if (notes.length === 0) {
        const emptyMessage = document.createElement("li");

        emptyMessage.textContent = "No notes yet.";

        notesList.appendChild(emptyMessage);

        return;
    }

    notes.forEach((note, index) => {
        const li = document.createElement("li");

        li.textContent = note;

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            deleteNote(index);
        });

        li.appendChild(deleteButton);

        notesList.appendChild(li);
    });
}

function addNote(note) {
    notes.push(note);

    saveNotes();

    renderNotes();
}

function deleteNote(index) {
    notes.splice(index, 1);

    saveNotes();

    renderNotes();
}

noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const note = noteInput.value.trim();

    if (note === "") {
        return;
    }

    addNote(note);

    noteInput.value = "";

    noteInput.focus();
});

renderNotes();