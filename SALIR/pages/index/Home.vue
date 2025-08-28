<template>
	<view>
		<van-nav-bar style="margin-top: 40px;" title="地球游客攻略app" />
		<view class="header">
			<view style="font-size: 18px; font-weight: 700;" class="titletip">我的行程</view>
			<van-icon name="add" style="color:#007aff;font-size: 30px;" @click="create" />
		</view>
		<view style="text-align: center; padding: 100px 20px;" v-if="itins.length <= 0">
			<view class="text-gray-500 mb-4">暂无行程计划</view>
			<view class="text-gray-400 text-sm">点击右上方"+"按钮创建新行程</view>
		</view>
		<view class="card" v-else v-for="(item,index) in itins" @click="goDetile(item)">
			<view style="display: flex;">
				<img id="1" :src="item.img" alt="travel to Tokyo"
					style="width: 100px; height: 100px; border-radius: 8px; object-fit: cover; margin-right: 16px;">
				<view style="flex: 1;">
					<view style="display: flex; justify-content: space-between; align-items: center;">
						<view style="font-weight: 700; font-size: 18px;">{{item.planname}}</view>
						<van-icon name="arrow" style="font-size: 24px; color: #999;" />
					</view>
					<view style="color: #666; margin: 8px 0;font-size: 16px;">{{item.begindt}} - {{item.enddt}}</view>
					<view style="display: flex; gap: 10px;">
						<van-tag type="primary" style="margin-left: 8px;" v-for="t in item.tips">{{t.val}}</van-tag>
					</view>
					<view style="color: #999; font-size: 13px; margin-top: 8px;">
						{{item.address}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		requestHttp
	} from '../../api/request'
	import {
		parseDateString
	} from '../../common/datetime.js'
	export default {
		data() {
			return {
				itins: [{
					planname: '东京',
					img: 'https://modao.cc/ai/uploads/ai_pics/15/154327/aigp_1755675816.jpeg',
					begindt: '3月15日',
					enddt: '3月20日',
					tips: [{
							val: '购物',
						},
						{
							val: '美食',
						}
					],
					address: '东京、大阪、京都'
				}, {
					planname: '夏威夷',
					img: 'https://modao.cc/ai/uploads/ai_pics/15/154328/aigp_1755675818.jpeg',
					begindt: '5月22日',
					enddt: '5月30日',
					tips: [{
							val: '海滩',
						},
						{
							val: '度假',
						}
					],
					address: '檀香山、茂宜岛'
				}],
				plan: ''
			}
		},
		methods: {
			create(e) {
				uni.navigateTo({
					url: '/pages/plan/create'
				})
			},
			init() {
				const userInfo = uni.getStorageSync('UserInfo')
				const opt = {
					servername: 'api/TsPlan/QueryPlan',
					params: {
						user_id: userInfo.id
					},
					method: 'get'
				}
				requestHttp(opt).then(res => {
					const result = res.data
					this.itins = [];
					for (var i = 0; i < result.length; i++) {
						this.itins.push({
							id: result[i].id,
							planname: result[i].plaN_NAME,
							img: result[i].heaD_IMG,
							begindt: parseDateString(result[i].begiN_DATE, 'M'),
							enddt: parseDateString(result[i].enD_DATE, 'M'),
							realbegin: parseDateString(result[i].begiN_DATE),
							realend: parseDateString(result[i].enD_DATE),
							address: result[i].target
						})

					}
				})

			},
			goDetile(item) {
				uni.setStorageSync('tempItem', item)
				uni.navigateTo({
					url: '/pages/plan/create'
				})
			}
		},
		mounted() {
			this.init()
		}
	}
</script>

<style>
	.card {
		background: white;
		border-radius: 16px;
		padding: 16px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
		border: 1px solid #eee;
		margin-bottom: 12px;
	}
</style>