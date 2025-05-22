const addBtn = document.getElementById('addBtn');
const main = document.querySelector('.main');

addBtn.addEventListener('click', function () {

  let noNotesMsg = document.querySelector('h2');
  if (noNotesMsg) {
    noNotesMsg.remove();
  }

  let newNote = document.createElement('div');
  newNote.classList.add('note');

  let newDiv = document.createElement('div');
  newDiv.classList.add('tool');

  let newI = document.createElement('i');
  newI.classList.add('fas', 'fa-save');

  let newI2 = document.createElement('i');
  newI2.classList.add('fas', 'fa-trash');

  let textArea = document.createElement('textarea');

  newDiv.appendChild(newI);
  newDiv.appendChild(newI2);
  newNote.appendChild(newDiv);
  newNote.appendChild(textArea);
  main.appendChild(newNote);

  saveNote();
});

main.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-trash')) {
    const parentNote = e.target.closest('.note');
    if (parentNote) {
      parentNote.remove();
      if (main.children.length === 0) {
        main.innerHTML = '<h2>No notes found!!</h2>';
      }
      saveNote();
    }
  }
});

function saveNote() {
  let notes = [];
  document.querySelectorAll('.note textarea').forEach(textarea => {
    notes.push(textarea.value);
  });
  localStorage.setItem('notes', JSON.stringify(notes));
}

main.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-save')) {
    saveNote();
  }
});

function loadNotes() {
  let savedNotes = JSON.parse(localStorage.getItem('notes') || "[]");
  main.innerHTML = '';

  if (savedNotes.length === 0) {
    main.innerHTML = '<h2>No notes found!!</h2>';
    return;
  }
  else{
    main.innerHTML = '';
  }
    savedNotes.forEach(noteText => {
    let newNote = document.createElement('div');
    newNote.classList.add('note');

    let newDiv = document.createElement('div');
    newDiv.classList.add('tool');

    let newI = document.createElement('i');
    newI.classList.add('fas', 'fa-save');

    let newI2 = document.createElement('i');
    newI2.classList.add('fas', 'fa-trash');

    let textArea = document.createElement('textarea');
    textArea.value = noteText;

    newDiv.appendChild(newI);
    newDiv.appendChild(newI2);
    newNote.appendChild(newDiv);
    newNote.appendChild(textArea);
    main.appendChild(newNote);
  });
}


loadNotes();
