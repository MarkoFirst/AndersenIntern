permite('abcd');
 
function permite(str) {
	return permiter(str.split(''), 0, []);
}

function permiter(strIn, i, returnArr) {
  	if (i === strIn.length - 1) {
    	returnArr.push( strIn.reduce( (newStr, i) => {
			return newStr + i;
		}, ''));
  	} else {
    	for (let j = i; j < strIn.length; j++) {
      		change(strIn, i, j);
      		permiter(strIn, i + 1,returnArr);
    	}
  	}
	return returnArr;
}
 
function change( arr, i, j) {
  	let dop = arr[i];
  	arr[i] = arr[j];
  	arr[j] = dop;
}