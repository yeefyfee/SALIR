<template>
	<view class="container">
		<van-nav-bar style="margin-top: 40px;" title="行程计划" left-text="返回" right-text="保存" left-arrow
			@click-left="onClickLeft" @click-right="onClickRight" />
		<view class="content hide-scrollbar">
			<view style="margin-bottom: 24px;">
				<view style="font-size: 16px; font-weight: 500; margin-bottom: 8px;" class="titletip">计划名称</view>
				<input type="text" v-model="plan" class="form-input" placeholder="例如：春日日本之旅">
			</view>

			<view style="display: flex; gap: 16px; margin-bottom: 24px;">
				<view style="flex: 1;">
					<view style="font-size: 16px; font-weight: 500; margin-bottom: 8px;"class="titletip">开始日期</view>
					<picker mode="multiSelector" :value="dateTimebegin" @change="changeDateTime"
						@columnchange="changeDateTimeColumn" :range="dateTimeArray">
						<view class='picker'>
							{{begindt?begindt:formatDate(new Date())}}
						</view>
					</picker>
				</view>
				<view style="flex: 1;">
					<view style="font-size: 16px; font-weight: 500; margin-bottom: 8px;"class="titletip">结束日期</view>
					<picker mode="multiSelector" :value="dateTimeend" @change="changeDateTimeEnd"
						@columnchange="changeDateTimeColumn" :range="dateTimeArray">
						<view class='picker'>
							{{enddt?enddt:formatDate(new Date())}}
						</view>
					</picker>
				</view>
			</view>

			<view style="margin-bottom: 24px;">
				<view style="font-size: 16px; font-weight: 500; margin-bottom: 8px;"class="titletip">地点</view>
				<input type="text" class="form-input" placeholder="添加目的地">
				<view style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
					<van-tag type="primary">东京</van-tag>
					<van-tag type="primary">大阪</van-tag>
				</view>
			</view>

			<view style="margin-bottom: 24px;">
				<view style="font-size: 16px; font-weight: 500; margin-bottom: 8px;"class="titletip">封面照片</view>
				<view
					style="width: 100%; height: 150px; border-radius: 12px; border: 1px dashed #ddd; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #999; background: #f9f9f9;"
					@click="chooseConverImage">
					<template v-if="coverImage">
						<image :src="coverImage"
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

			<view style="padding: 12px; border: 1px solid #eee; border-radius: 8px; margin-top: 12px;">
				<view>3月15日 · 东京迪士尼</view>
				<view style="color: #999; font-size: 14px; margin-top: 4px;">上午09:00 - 下午09:00</view>
			</view>

			<view style="padding: 12px; border: 1px solid #eee; border-radius: 8px; margin-top: 12px;">
				<view>3月16日 · 浅草寺</view>
				<view style="color: #999; font-size: 14px; margin-top: 4px;">上午10:00 - 下午03:00</view>
			</view>

			<view style="padding: 12px; border: 1px solid #eee; border-radius: 8px; margin-top: 12px;">
				<view>3月16日 · 浅草寺</view>
				<view style="color: #999; font-size: 14px; margin-top: 4px;">上午10:00 - 下午03:00</view>
			</view>
			<view style="padding: 12px; border: 1px solid #eee; border-radius: 8px; margin-top: 12px;">
				<view>3月16日 · 浅草寺</view>
				<view style="color: #999; font-size: 14px; margin-top: 4px;">上午10:00 - 下午03:00</view>
			</view>
			<view style="padding: 12px; border: 1px solid #eee; border-radius: 8px; margin-top: 12px;">
				<view>3月16日 · 浅草寺</view>
				<view style="color: #999; font-size: 14px; margin-top: 4px;">上午10:00 - 下午03:00</view>
			</view>
			<view style="padding: 12px; border: 1px solid #eee; border-radius: 8px; margin-top: 12px;">
				<view>3月16日 · 浅草寺</view>
				<view style="color: #999; font-size: 14px; margin-top: 4px;">上午10:00 - 下午03:00</view>
			</view>
			<view style="padding: 12px; border: 1px solid #eee; border-radius: 8px; margin-top: 12px;">
				<view>3月16日 · 浅草寺</view>
				<view style="color: #999; font-size: 14px; margin-top: 4px;">上午10:00 - 下午03:00</view>
			</view>
			<view style="padding: 12px; border: 1px solid #eee; border-radius: 8px; margin-top: 12px;">
				<view>3月16日 · 浅草寺</view>
				<view style="color: #999; font-size: 14px; margin-top: 4px;">上午10:00 - 下午03:00</view>
			</view>
			<view style="padding: 12px; border: 1px solid #eee; border-radius: 8px; margin-top: 12px;">
				<view>3月16日 · 浅草寺</view>
				<view style="color: #999; font-size: 14px; margin-top: 4px;">上午10:00 - 下午03:00</view>
			</view>

			<view style="padding: 12px; border-radius: 8px; margin-top: 12px;">
				<van-button round type="info" color="#165DFF" @click="itineraryAdd" block><van-icon
						name="add" />添加行程</van-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getMonthDay,
		generateTimeStr,
		dateTimePicker,
		dtPickerShort
	} from '@/common/datetime.js'
	export default {
		data() {
			return {
				plan: '',
				dateTimebegin: '',
				dateTimeend: '',
				startYear: 2024,
				dateTimeArray: [
					['2025', '2026', '2027'], // 年
					['01', '02', '03'], // 月
					['01', '02', '03'] // 日
				],
				begindt: '',
				enddt: '',
				coverImage: '' // 封面图片地址
			}
		},
		methods: {
			onClickLeft(e) {
				uni.navigateBack()
			},
			onClickRight(e) {
				uni.showToast({
					title: '...'
				})
			},
			changeDateTime(e) {
				this.dateTimebegin = e.detail.value
				this.begindt = generateTimeStr(this.dateTimeArray, this.dateTimebegin)
			},
			changeDateTimeEnd(e) {
				this.dateTimeEnd = e.detail.value
				this.enddt = generateTimeStr(this.dateTimeArray, this.dateTimeEnd)
			},
			changeDateTimeColumn(e) {
				let {
					column,
					value
				} = e.detail;
				if (column == 0 || column == 1) {
					//直接修改数组下标视图不更新,用深拷贝之后替换数组
					let dateTime = JSON.parse(JSON.stringify(this.dateTimebegin));
					let dateTimeArray = JSON.parse(JSON.stringify(this.dateTimeArray));
					dateTime[column] = value;
					dateTimeArray[2] = getMonthDay(dateTimeArray[0][dateTime[0]], dateTimeArray[1][dateTime[
						1]]);
					this.dateTimebegin = dateTime;
					this.dateTimeArray = dateTimeArray;
				}
			},
			formatDate(date) {
				return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
			},
			initTime() {
				let date = new Date();
				let endYear = date.getFullYear() + 5;
				// 获取完整的年月日 时分秒，以及默认显示的数组
				let obj = dtPickerShort(this.startYear, endYear);

				this.dateTimeArray = obj.dateTimeArray
				this.dateTimebegin = obj.dateTime
				this.begindt = this.formatDate(new Date())
			},
			chooseConverImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					sourceType: ['album'],
					success: (res) => {
						this.coverImage = res.tempFilePaths[0];
					}
				});
			},
			itineraryAdd() {
				uni.navigateTo({
					url: '/pages/plan/createDetail'
				})
			}
		},
		mounted() {
			this.initTime()
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