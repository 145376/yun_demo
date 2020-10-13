'use strict';
const db = uniCloud.database();
exports.main = async ({id}, context) => {
	let res = db.collection('member').doc('id').remove(id);
	return res
};
