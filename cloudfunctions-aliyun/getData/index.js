'use strict';
const db = uniCloud.database();
const dbCmd = db.command  //查询语句指令
exports.main = async (event, context) => {
	if(event.type === 'index'){
		//获取首页数据
		let swiperList = await db.collection('indexSwiper').get();
		let cheapList = await db.collection('production').where({
			isCheap: true
		}).get()
		return {
			swiperList,
			cheapList
		}
	}
};
