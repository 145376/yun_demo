'use strict';
const db = uniCloud.database();
const dbCmd = db.command  //查询语句指令
exports.main = async (event, context) => {
	if(event.type === 'eq50'){
		//获取等于50岁的人员
		let res = await db.collection('member').where({
			age: dbCmd.eq(50)
		}).get()
		return res
	}else{
		let res = await db.collection('member').orderBy("age", 'asc').get()
		return res
	}
};
