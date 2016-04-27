
try {
	iDontExist();
} catch(e) {
	console.log('errorName:', e.name, ' ,errorMessage: ', e.message);
} finally {
	console.log('Finally!');
}