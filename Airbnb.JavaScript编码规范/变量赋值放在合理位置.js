// good
function a() {
	test();
	console.log('doing stuff..');

	// ..other stuff..
	const name = getName();

	if (name === 'test') {
		return false;
	}

	return name;
}

// bad - unnecessary function call
function b(hasName) {
	const name = getName();

	if (!hasName) {
		return false;
	}

	this.setFirstNode(name);

	return true;
}

// good
function c(hasName) {
	if (!hasName) {
		return false;
	}

	const name = getName();
	this.setFirstName(name);

	return true;
}