<template>
	<view class="index">
		<view class="btns">
			<button type="primary" @tap="add">点击添加数据</button>		
			<button type="primary" @tap="getSpecialData">点击获取50岁的用户</button>
			<button type="primary" @tap="getData">点击获取所有用户</button>
		</view>
		<view class="list">
			<view class="item" v-for="item in list" :key="item._id" @tap="remove(item._id)">
				<view>{{item.name}} --- {{item.age}}</view>
				<view class="remove">x</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(){
			this.getData()
		},
		data() {
			return {
				list:[]
			};
		},
		methods:{
			async getData(){
				let {result:{data}} = await uniCloud.callFunction({
					name: 'getData',
				})
				// console.log(data)
				this.list = data
			},
			async add(){
				let {success} = await uniCloud.callFunction({
					name:'addData',
					data:{
						name: 'eg',
						age: 20
					}
				})
				if(success){
					this.getData()
				}
			},
			async remove(id){
				let {success} = await uniCloud.callFunction({
					name:'removeData',
					data:{
						id
					}
				})
				if(success){
					this.getData()
				}
			},
			async getSpecialData(){
				let {result, success} = await uniCloud.callFunction({
					name:'getData',
					data:{
						type: 'eq50'
					}
				})
				if(success){
					this.list = result.data
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.index{
	.btns{
		margin: 100rpx 80rpx;
		button{
			margin-bottom: 30rpx;
			&:last-child{
				margin-bottom: 0;
			}
		}
	}
	.list{
		padding: 25rpx;
		.item{
			padding: 0 25rpx;
			font-size:32rpx;
			display:flex;
			align-items: center;
			justify-content: space-between;
			.remove{
				color:red;
			}
		}
	}
}
</style>
