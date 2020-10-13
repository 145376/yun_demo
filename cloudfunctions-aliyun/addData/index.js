'use strict';
const db = uniCloud.database();
exports.main = async ({name, age}, context) => {
	let res = await db.collection('member').add({
		name,
		age
	})
	return res
};
