'use strict';


var  currentNote = 1,
note = document.getElementById('note'),
ul = document.getElementById('list'),
list = localStorage.getItem('list') || [];


if (list.length !== 0){
	list = list.split(',').sort(cbSort);
	currentNote = list[0];
	updateList();
	getNote(currentNote);

} else {
	newNote();
	updateList();
}

function newNote () {
	list = localStorage.getItem('list') || [];
	if (list.length){
		list = list.split(',').sort(cbSort);
		var last = parseInt(list[list.length - 1]) + 1;
	}
	else{
		last = 1
	}
	console.log(last);
	list[list.length] = last;
	localStorage.setItem('list', list.join());
	localStorage.setItem(last, '');
	currentNote = last;
	list = localStorage.getItem('list').split(',');

	updateList();
	getNote(currentNote);
}

function del(){
	if (currentNote){
		localStorage.removeItem(currentNote);
		list.splice(list.indexOf(currentNote), 1);

		if ( list.length === 0 ){
			localStorage.removeItem('list');
			newNote();
		}
		else{ 
			localStorage.setItem('list', list.join());
			list = localStorage.getItem('list').split(',').sort(cbSort);
			currentNote = list[0];
			updateList();
			getNote(currentNote);
		}
	}
}

function updateList(){

	while (ul.firstChild) {
		ul.removeChild(ul.firstChild);
	}

	for (var i = 0; i <= list.length - 1 ; i++) {
		var data = localStorage.getItem(list[i]);
		if (data)
			(data.length >= 10) ? data = data.substr(0, 9).trim() + '...' : data = data.trim();
		else
			data = "empty";
		var li = document.createElement('li');
		li.setAttribute("id", "note"+list[i]);
		li.innerHTML = data;
		ul.appendChild(li);
	};
}

function updateTitle(title, id){
	if (title.length >= 10)
		title = title.substr(0, 9) + '...';
	else if (title.length == 0)
		title = "empty";
	document.getElementById('note'+id).innerHTML = title;
}


function cbSort(a, b){
	return parseInt(a) - parseInt(b);
}

document.getElementById('note').onkeyup = function(){
	var val = document.getElementById('note').value;
	localStorage.setItem(currentNote, val);
	updateTitle(val, currentNote);
}

function getNote(id){
	var data;
	if (id !== currentNote)
		document.getElementById('note'+currentNote).className = '';
	document.getElementById('note'+id).className = 'selected';
	note.focus();
	if ((data = localStorage.getItem(id)) !== null){
		note.value = data;
	}
	currentNote = id;
}

function whatClicked(evt) {
	getNote(evt.target.id.replace('note', ''));

}

ul.addEventListener("click", whatClicked, false);