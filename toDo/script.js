const ol = document.querySelector('ol');
const input = document.querySelector('input');
const saveBut = document.getElementById('saveBut');
const addBut = document.getElementById('addBut');
const divPag = document.querySelector('.pagination');
let element = true;
let allTasks = [];
let pageNow = 1;

function add (){
	if(input.value == ""){
		return;
	}
	if(allTasks.length > 4){
		let allLi = ol.querySelectorAll('li');

		if(allTasks.length%5 == 0){
			for(let i of allLi){
				i.querySelector('input').checked = false;
				i.querySelector('span').innerText = "";
			}
			createButList(divPag.querySelectorAll('button').length-1);
			for(let i of allLi){
				i.style.visibility = 'hidden';
			}
		}
		allLi[allTasks.length%5].style.visibility='visible';
		allLi[allTasks.length%5].querySelector('span').innerText = input.value;

		allTasks.push([input.value, false]);

		input.value = '';
		
		return;
	}
	let li = document.createElement('li');
	li.innerHTML ='<input type="checkbox" value="'+allTasks.length+'"><button value="Change">Change</button>	<button value="Delete">Delete</button><span>'+input.value+'</span>';
	li.addEventListener('click', changeOrRemove);
	allTasks.push([input.value, false]);
	ol.appendChild(li);
	input.value = '';
}

function save (){
	addBut.style.display = 'inline ';
	saveBut.style.display = 'none';
	element.querySelector('span').innerHTML = input.value;
	input.value = '';
	element = true;
}

function changeOrRemove (){
	if(event.target.value == 'Delete'){
		this.parentNode.removeChild(this);
	} else if (event.target.value == 'Change'){
		element = this;
		addBut.style.display = 'none';
		saveBut.style.display = 'inline ';
		input.value = this.querySelector('span').innerHTML;
		input.focus();
	} else if (event.target.checked || !event.target.checked){
		allTasks[event.target.value+(5*(pageNow-1))][1] = event.target.checked;
	}
}

function removeAll(){
	const allLi = ol.querySelectorAll('li');
	for(let i of allLi){
		i.parentNode.removeChild(i);
	}
	element = true;
	allTasks = [];
	pageNow = 1;
}

function enterInput(e){
	if (e.keyCode == 13) {
		if (element === true){
        	add();
    	} else {
    		save();
    	}
    }
}


function createButList(num){
	ol.start = allTasks.length+1;

	let numList = document.createElement('button');
	numList.innerHTML = "" + num;
	numList.value = num;

	numList.style.width = '30px';
	numList.style.height = '30px';

	divPag.appendChild(numList);

	divPag.addEventListener('click', changeList);

}

function changeList(){

	if(event.target.value == "non"){return;}

	pageNow = event.target.value;
	ol.start = (pageNow-1)*5+1;

	let allLi = ol.querySelectorAll('li');

	for(let i = 0; i < allLi.length; i++){

		if(allTasks[(pageNow-1)*5+i]==null){
			allLi[i].querySelector('input').checked = false;
			allLi[i].querySelector('span').innerText = "";

			allLi[i].style.visibility = 'hidden';
		} else {
			allLi[i].style.visibility = 'visible';
			allLi[i].querySelector('input').checked = allTasks[(pageNow-1)*5+i][1];
			allLi[i].querySelector('span').innerText = allTasks[(pageNow-1)*5+i][0];
		}
	}
}

window.onload = function() {
	input.focus();
	createButList(1);
}

function firstPage(){

	let allBut = divPag.querySelectorAll('button');

	for(let i of allBut){
		if(i.value == 1){
			i.click();
		}
	}
	
}
function lastPage(){
	let allBut = divPag.querySelectorAll('button');

	for(let i of allBut){
		if(i.value == allBut.length-2){
			i.click();
		}
	}
}
