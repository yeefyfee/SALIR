<template>
	<view class="container">
		<van-nav-bar style="margin-top: 40px;" title="行程计划" left-text="返回" right-text="保存" left-arrow
			@click-left="onClickLeft" @click-right="onClickRight" />
		<view class="content hide-scrollbar">
			<view style="margin-bottom: 24px;">
				<view style="font-size: 16px; font-weight: 500; margin-bottom: 8px;" class="titletip">计划名称</view>
				<input type="text" v-model="planInfo.planname" class="form-input" placeholder="例如：春日日本之旅">
			</view>

			<view style="display: flex; gap: 16px; margin-bottom: 24px;">
				<view style="flex: 1;">
					<view style="font-size: 16px; font-weight: 500; margin-bottom: 8px;" class="titletip">开始日期</view>
					<picker mode="multiSelector" :value="dateTimebegin" @change="changeDateTime"
						@columnchange="changeDateTimeColumn" :range="dateTimeArray">
						<view class='picker'>
							{{planInfo.realbegin?planInfo.realbegin:formatDate(new Date())}}
						</view>
					</picker>
				</view>
				<view style="flex: 1;">
					<view style="font-size: 16px; font-weight: 500; margin-bottom: 8px;" class="titletip">结束日期</view>
					<picker mode="multiSelector" :value="dateTimeend" @change="changeDateTimeEnd"
						@columnchange="changeDateTimeColumn" :range="dateTimeArray">
						<view class='picker'>
							{{planInfo.realend?planInfo.realend:formatDate(new Date())}}
						</view>
					</picker>
				</view>
			</view>
			<view v-if="!isDateValid && planInfo.realbegin && planInfo.realend"
				style="color: #ff4d4f; font-size: 12px; margin-top: 8px; text-align: center;">
				结束日期不能早于开始日期
			</view>

			<view style="margin-bottom: 24px;">
				<view style="font-size: 16px; font-weight: 500; margin-bottom: 8px;" class="titletip">地点</view>
				<input type="text" class="form-input" placeholder="添加目的地" v-model="planInfo.address" />
				<view style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
					<!-- <van-tag type="primary">东京</van-tag>
					<van-tag type="primary">大阪</van-tag> -->
				</view>
			</view>

			<view style="margin-bottom: 24px;">
				<view style="font-size: 16px; font-weight: 500; margin-bottom: 8px;" class="titletip">封面照片</view>
				<view
					style="width: 100%; height: 150px; border-radius: 12px; border: 1px dashed #ddd; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #999; background: #f9f9f9;"
					@click="chooseConverImage">
					<template v-if="planInfo.img">
						<image :src="planInfo.img"
							style="width: 100%; height: 100%; border-radius: 12px; object-fit: cover;" />
					</template>
					<template v-else>
						<van-icon style="font-size: 40px;" name="photo-o" />
						点击添加封面图片
					</template>
				</view>
			</view>

			<view class="titletip"
				style="margin-top: 24px; font-weight: 700; font-size: 18px; padding-bottom: 8px; border-bottom: 1px solid #eee;">
				日程管理</view>

			<view style="padding: 12px; border: 1px solid #eee; border-radius: 8px; margin-top: 12px;"
				v-for="d in planInfo.dtls">
				<view style="display: flex; justify-content: space-between; align-items: center;">
					<view style=" font-size: 18px;">{{pdate(d.plaN_DATE.substr(0,10),'M')}} ·
						{{d.address}}
					</view>
					<van-icon name="arrow" style="font-size: 18px; color: #999;" />
				</view>
				<view style="color: #999; font-size: 14px; margin-top: 4px;">{{d.begiN_TIME}} - {{d.enD_TIME}}</view>
			</view>

			<view style="padding: 12px; border-radius: 8px; margin-top: 12px;">
				<van-button round type="info" color="#165DFF" @click="itineraryAdd" block :disabled="!isDateValid">
					<van-icon name="add" />添加行程
				</van-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		requestHttp
	} from '../../api/request';
	import {
		parseDateString as pdate
	} from '../../common/datetime.js'
	import {
		getMonthDay,
		generateTimeStr,
		dateTimePicker,
		dtPickerShort
	} from '@/common/datetime.js'
	import {
		pathToBase64
	} from '../../common/helper.js'
	export default {
		data() {
			return {
				planInfo: {},
				plan: '',
				dateTimebegin: '',
				dateTimeend: '',
				startYear: 2024,
				dateTimeArray: [
					['2025', '2026', '2027'], // 年
					['01', '02', '03'], // 月
					['01', '02', '03'] // 日
				],
				base64: ''
			}
		},
		onLoad() {
			this.planInfo = uni.getStorageSync('tempItem')
			//uni.removeStorageSync('tempItem')
		},
		computed: {
			isDateValid() {
				if (!this.planInfo.realbegin || !this.planInfo.realend) return false;

				try {
					const startDate = this.parseDateString(this.planInfo.realbegin);
					const endDate = this.parseDateString(this.planInfo.realend);
					return endDate >= startDate;
				} catch (e) {
					return false;
				}
			}
		},
		methods: {
			pdate,
			onClickLeft(e) {
				uni.navigateBack()
			},
			onClickRight(e) {
				console.log(this.base64)
			},
			changeDateTime(e) {
				this.dateTimebegin = e.detail.value
				this.planInfo.realbegin = generateTimeStr(this.dateTimeArray, this.dateTimebegin)
				// 验证时间范围
				this.validateDateRange();
			},
			changeDateTimeEnd(e) {
				this.dateTimeend = e.detail.value
				this.planinfo.realend = generateTimeStr(this.dateTimeArray, this.dateTimeend)
				// 验证时间范围
				this.validateDateRange();
			},
			changeDateTimeColumn(e) {
				let {
					column,
					value
				} = e.detail;
				if (column == 0 || column == 1) {
					//直接修改数组下标视图不更新,用深拷贝之后替换数组
					let dateTimeArray = JSON.parse(JSON.stringify(this.dateTimeArray));
					dateTimeArray[2] = getMonthDay(dateTimeArray[0][value], dateTimeArray[1][value]);
					this.dateTimeArray = dateTimeArray;
				}
			},
			formatDate(date) {
				const year = date.getFullYear();
				const month = (date.getMonth() + 1).toString().padStart(2, '0');
				const day = date.getDate().toString().padStart(2, '0');
				return `${year}年${month}月${day}日`;
			},
			// 验证日期范围
			validateDateRange() {
				if (!this.planInfo.realbegin || !this.planInfo.realend) return true;

				// 将日期字符串转换为Date对象进行比较
				const startDate = this.parseDateString(this.planInfo.realbegin);
				const endDate = this.parseDateString(this.planInfo.realend);

				if (endDate < startDate) {
					return false;
				}
				return true;
			},
			// 解析日期字符串
			parseDateString(dateStr) {
				const year = parseInt(dateStr.match(/(\d+)年/)[1]);
				const month = parseInt(dateStr.match(/(\d+)月/)[1]);
				const day = parseInt(dateStr.match(/(\d+)日/)[1]);
				return new Date(year, month - 1, day);
			},
			initTime() {
				let date = new Date();
				let endYear = date.getFullYear() + 5;
				// 获取完整的年月日 时分秒，以及默认显示的数组
				let obj = dtPickerShort(this.startYear, endYear);

				this.dateTimeArray = obj.dateTimeArray
				this.dateTimebegin = obj.dateTime
				this.dateTimeend = obj.dateTime
				if (!this.planInfo) {
					this.planInfo.realbegin = this.formatDate(new Date())
					this.planInfo.realend = this.formatDate(new Date())
				} else {
					const bt = this.planInfo.realbegin.replace(/年|月|日/g, '-').slice(0, -1);
					const et = this.planInfo.realend.replace(/年|月|日/g, '-').slice(0, -1);
					this.dateTimebegin = dtPickerShort(this.startYear, endYear, bt).dateTime
					this.dateTimeend = dtPickerShort(this.startYear, endYear, et).dateTime
				}

			},
			chooseConverImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					sourceType: ['album'],
					success: (res) => {
						this.planInfo.img = res.tempFilePaths[0];
						this.ImgToBase64(res.tempFilePaths[0]).then(base64 => {
							console.log(base64)
							this.base64 = base64
						})
					}
				});
			},
			ImgToBase64(data) {
				return new Promise((resolve, reject) => {
					pathToBase64(data).then(base64 => {
						resolve(base64)
					}).catch(error => {
						console.error(error)
						reject(error)
					})
				})
			},
			itineraryAdd() {
				// 传递开始和结束日期到详情页面
				const startDate = this.planInfo.realbegin ? this.planInfo.realbegin.replace(/年|月|日/g, '-').slice(0, -1) :
					'2025-03-15';
				const endDate = this.planInfo.realend ? this.planInfo.realend.replace(/年|月|日/g, '-').slice(0, -1) :
					'2025-03-20';

				uni.navigateTo({
					url: `/pages/plan/createDetail?startDate=${startDate}&endDate=${endDate}`
				})
			},
			GetPlanDtl() {
				var opt = {
					servername: 'api/TsPlanDetail/GetPlanDtls',
					params: {
						planId: this.planInfo.id
					},
					method: 'get'
				}
				requestHttp(opt).then(res => {
					this.planInfo.dtls = res.data

				})


			}
		},
		mounted() {
			this.initTime()
			this.GetPlanDtl()
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.content {
		flex: 1;
		overflow-y: auto;
		min-height: 0;
		padding: 18px;
	}

	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}

	.hide-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.btn-primary {
		background: #165DFF;
		color: white;
		border-radius: 8px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
	}

	.form-input {
		margin-top: 10px;
		border-bottom: 1px dashed #e0e0e0;
	}
</style>