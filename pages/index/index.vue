<template>
	<view class="index">
		<view class="search">
			<view class="iconfont icon-sousuo"></view>
			<view>请输入搜所关键字</view>
		</view>
		<view class="swiper">
			<u-swiper name="url" :list="swiperList" img-mode="scaleToFill" height="340"></u-swiper>
		</view>
		<!-- 超值专享 -->
		<view class="cheap">
			<view class="title">
				<u-section title="超值专享" sub-title="更多" color="#fa3534" font-size="40"></u-section>
				<view class="content">
					<scroll-view :scroll-x="true">
						<view class="item" v-for="item in cheapList" :key="item._id">
							<image :src="item.img_url" :lazy-load="true"></image>
							<view>{{item.desc}}</view>
							<view>
								<view class="old">￥{{item.price}}</view>
								<view class="now">￥{{item.cheap_price}}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- 限时秒杀 -->
		<view class="time_limit">
			<view class="title">
				<u-section title="限时秒杀" sub-title="更多" color="#fa3534" font-size="40"></u-section>
				<view class="content">
					<scroll-view :scroll-x="true">
						<view class="item" v-for="item in cheapList" :key="item._id">
							<image :src="item.img_url" :lazy-load="true"></image>
							<view>{{item.desc}}</view>
							<view>
								<view class="old">￥{{item.price}}</view>
								<view class="now">￥{{item.cheap_price}}</view>
							</view>
						</view>
					</scroll-view>
				</view>
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
				swiperList:[],
				cheapList:[],
				loading:true
			};
		},
		methods:{
			async getData(){
				let {result} = await uniCloud.callFunction({
					name: 'getData',
					data:{
						type: 'index'
					}
				})
				this.loading = false
				this.swiperList = result.swiperList.data
				this.cheapList = result.cheapList.data
				console.log(this.cheapList)
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
		}
	}
</script>

<style lang="scss">
page{
	height:100%;
	background-color: #fff;
}
</style>
<style lang="scss" scoped>
.index{
	padding-bottom: 100rpx;
	.search{
		width:100%;
		height:100rpx;
		background-color:$u-type-error;
		padding:15rpx 30rpx;
		position: relative;
		view{
			&:first-child{
				position: absolute;
				top: 15rpx;
				left: 55rpx;
				font-size: 40rpx;
			}
			&:last-child{
				width:100%;
				height:100%;
				background-color: #fff;
				border-radius: 60rpx;
				color: $u-light-color;
				line-height: 70rpx;
				padding-left: 80rpx;
			}
		}
	}
	.swiper{
		width:100%;
		height:340rpx;
	}
	.cheap,
	.time_limit{
		margin-top: 40rpx;
		padding: 0 25rpx;
		.content{
			width:100%;
			height:350rpx;
			margin-top: 15rpx;
			scroll-view{
				width: 100%;
				height:350rpx;
				::v-deep .uni-scroll-view-content{
					display: flex;
				}
			}
			.item{
				width: 200rpx;
				height: 350rpx;
				padding: 0 15rpx;
				image{
					width:200rpx;
					height:150rpx;
				}
				view{
					&:first-child{
						font-size:26rpx;
						color: $u-tips-color;
					}
					&:last-child{
						display:flex;
						align-items: center;
						justify-content: space-between;
						.now,
						.old{
							font-size: 26upx;
							position: relative;
						}
						.old::after{
							content:'';
							width:100%;
							height:4rpx;
							background-color: #999;
							position: absolute;
							top:22rpx;
							left:0;
							// transform: translateY(-50%);
						}
						.now{
							color:$u-type-error;
						}
					}
				}
			}
		}
	}
}
</style>
