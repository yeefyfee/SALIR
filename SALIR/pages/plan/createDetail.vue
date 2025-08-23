<template>
	<view class="container">
		<van-nav-bar style="margin-top: 40px;" title="项目内容" left-text="返回" left-arrow @click-left="back">
			<template #right>
				<van-icon name="success" style="font-size: 25px;color: #007aff;" />
			</template>
		</van-nav-bar>
		<view class="content hide-scrollbar">
			<img id="3" src="https://modao.cc/ai/uploads/ai_pics/15/154330/aigp_1755675820.jpeg" alt="tokyo disneyland"
				style="width: 100%; height: 180px; border-radius: 12px; object-fit: cover;">

			<view style="margin-top: 24px;">
				<view style="font-size: 16px; margin-bottom: 8px; font-weight: 500;" class="titletip">日程时间</view>
				<view style="display: flex; gap: 16px;">
					<view style="flex: 1;">
						<view style="color: #999; font-size: 13px;">日期</view>
						<picker mode="multiSelector" :value="dateTime" @change="changeDateTime"
							@columnchange="changeDateTimeColumn" :range="dateTimeArray">
							<view class='picker'>
								{{ selectedDate ? selectedDate : formatDate(new Date()) }}
							</view>
						</picker>
					</view>
					<view style="flex: 1; display: flex; gap: 8px;">
						<view style="flex: 1;">
							<view style="color: #999; font-size: 13px;">开始</view>
							<picker mode="multiSelector" :value="startTime" @change="changeStartTime"
								@columnchange="changeTimeColumn" :range="timeArray">
								<view class='picker'>
									{{ startTimeStr ? startTimeStr : '09:00' }}
								</view>
							</picker>
						</view>
						<view style="flex: 1;">
							<view style="color: #999; font-size: 13px;">结束</view>
							<picker mode="multiSelector" :value="endTime" @change="changeEndTime"
								@columnchange="changeTimeColumn" :range="timeArray">
								<view class='picker'>
									{{ endTimeStr ? endTimeStr : '21:00' }}
								</view>
							</picker>
						</view>
					</view>
				</view>
			</view>

			<view style="margin-top: 24px;">
				<view style="font-size: 16px; margin-bottom: 8px; font-weight: 500;" class="titletip">出行方式</view>
				<view
					style="display: flex; gap: 12px; overflow-x: auto; padding-bottom: 8px; -webkit-overflow-scrolling: touch;">
					<view v-for="item in transportList" @click="runtype = item.code" :style="{
						flex: '0 0 auto',
						width: '60px',
						height: '60px',
						borderRadius: '12px',
						background: item.code == runtype ? item.cbgcolor : item.dbgcolor,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center'
					}">
						<image :src="item.code == runtype ? item.cicon : item.dicon" style="width: 25px;height:25px;" />
						<view :style="{
							fontSize: '12px',
							marginTop: '4px',
							color: item.code == runtype ? item.ctxtcolor : item.dtxtcolor
						}">{{ item.name }}</view>
					</view>
				</view>
			</view>

			<view style="margin-top: 24px;">
				<view style="display: flex; justify-content: space-between; align-items: center;">
					<view style="font-size: 16px; font-weight: 500;" class="titletip">提醒通知</view>
					<van-switch :checked="checked" @change="onSwitchChange" />
				</view>
				<view v-if="checked" style="margin-top: 12px; display: flex; gap: 8px;">
					<van-tag type="primary" size="medium" style="margin-left: 8px;" :plain="t.min !== time"
						v-for="t in runtime" @click="onTime(t)">{{ t.option }}</van-tag>
				</view>
			</view>

			<view style="margin-top: 24px;">
				<view style="font-size: 16px; font-weight: 500; margin-bottom: 8px;" class="titletip">地点</view>
				<input type="text" class="form-input" placeholder="例如：日本东京迪士尼乐园">

			</view>

			<view style="margin-top: 24px;">
				<view style="font-size: 16px; font-weight: 500; margin-bottom: 8px;" class="titletip">备注</view>
				<textarea class="form-input" style="height: 100px;" v-model="remark"
					placeholder="添加日程备注信息，例如：提前官网购票，避开周末节假日人流高峰。"></textarea>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getMonthDay,
		generateTimeStr,
		dateTimePicker,
		dtPickerShort,
		dtPickerWithRange
	} from '@/common/datetime.js'

	export default {
		data() {
			return {
				transportList: [{
						code: 'walk',
						name: '步行',
						dicon: '/static/runtype/walk.svg',
						cicon: '/static/runtype/walk_c.svg',
						dbgcolor: '#f0f7ff',
						cbgcolor: '#165DFF',
						dtxtcolor: 'black',
						ctxtcolor: 'white'
					},
					{
						code: 'subway',
						name: '地铁',
						dicon: '/static/runtype/subway.svg',
						cicon: '/static/runtype/subway_c.svg',
						dbgcolor: '#f0f7ff',
						cbgcolor: '#165DFF',
						dtxtcolor: 'black',
						ctxtcolor: 'white'
					},
					{
						code: 'self',
						name: '自驾',
						dicon: '/static/runtype/self.svg',
						cicon: '/static/runtype/self_c.svg',
						dbgcolor: '#f0f7ff',
						cbgcolor: '#165DFF',
						dtxtcolor: 'black',
						ctxtcolor: 'white'
					},
					{
						code: 'taxi',
						name: '打车',
						dicon: '/static/runtype/taxi.svg',
						cicon: '/static/runtype/taxi_c.svg',
						dbgcolor: '#f0f7ff',
						cbgcolor: '#165DFF',
						dtxtcolor: 'black',
						ctxtcolor: 'white'
					}
				],
				runtype: 'self',
				time: 120,
				runtime: [{
					min: 30,
					option: '提前30分钟'
				}, {
					min: 60,
					option: '提前1小时'
				}, {
					min: 120,
					option: '提前2小时'
				}],
				checked: true,
				// 日期时间选择器相关数据
				dateTime: '',
				dateTimeArray: [
					['2025', '2026', '2027'], // 年
					['01', '02', '03'], // 月
					['01', '02', '03'] // 日
				],
				selectedDate: '',
				// 时间选择器相关数据
				startTime: [9, 0], // 默认9:00
				endTime: [21, 0], // 默认21:00
				timeArray: [
					['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15',
						'16', '17', '18', '19', '20', '21', '22', '23'
					], // 小时
					['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'] // 分钟
				],
				startTimeStr: '',
				endTimeStr: '',
				remark: ''
			}
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			onSwitchChange(e) {
				this.checked = e.detail;
			},
			onTime(e) {
				this.time = e.min;
			},
			// 日期选择器方法
			changeDateTime(e) {
				this.dateTime = e.detail.value
				this.selectedDate = generateTimeStr(this.dateTimeArray, this.dateTime)
			},
			changeDateTimeColumn(e) {
				let {
					column,
					value
				} = e.detail;
				if (column == 0 || column == 1) {
					//直接修改数组下标视图不更新,用深拷贝之后替换数组
					let dateTime = JSON.parse(JSON.stringify(this.dateTime));
					let dateTimeArray = JSON.parse(JSON.stringify(this.dateTimeArray));
					dateTime[column] = value;
					dateTimeArray[2] = getMonthDay(dateTimeArray[0][dateTime[0]], dateTimeArray[1][dateTime[1]]);
					this.dateTime = dateTime;
					this.dateTimeArray = dateTimeArray;
				}
			},
			// 时间选择器方法
			changeStartTime(e) {
				this.startTime = e.detail.value
				this.startTimeStr = this.timeArray[0][this.startTime[0]] + ':' + this.timeArray[1][this.startTime[1]]
				// 验证时间范围
				this.validateTimeRange();
			},
			changeEndTime(e) {
				this.endTime = e.detail.value
				this.endTimeStr = this.timeArray[0][this.endTime[0]] + ':' + this.timeArray[1][this.endTime[1]]
				// 验证时间范围
				this.validateTimeRange();
			},
			changeTimeColumn(e) {
				// 时间选择器的列变化处理
				let {
					column,
					value
				} = e.detail;
				// 这里可以添加时间验证逻辑
			},
			// 验证时间范围
			validateTimeRange() {
				const startHour = parseInt(this.timeArray[0][this.startTime[0]]);
				const startMinute = parseInt(this.timeArray[1][this.startTime[1]]);
				const endHour = parseInt(this.timeArray[0][this.endTime[0]]);
				const endMinute = parseInt(this.timeArray[1][this.endTime[1]]);

				const startTotal = startHour * 60 + startMinute;
				const endTotal = endHour * 60 + endMinute;

				if (endTotal <= startTotal) {
					uni.showToast({
						title: '结束时间不能早于开始时间',
						icon: 'none'
					});
					return false;
				}
				return true;
			},
			formatDate(date) {
				const year = date.getFullYear();
				const month = (date.getMonth() + 1).toString().padStart(2, '0');
				const day = date.getDate().toString().padStart(2, '0');
				return `${year}年${month}月${day}日`;
			},
			initDateTime() {
				// 从页面参数获取时间范围
				const pages = getCurrentPages();
				const currentPage = pages[pages.length - 1];
				const options = currentPage.options;

				const startDate = options.startDate || '2025-03-15';
				const endDate = options.endDate || '2025-03-20';

				// 使用时间范围限制的日期选择器
				let obj = dtPickerWithRange(startDate, endDate);

				this.dateTimeArray = obj.dateTimeArray
				this.dateTime = obj.dateTime
				this.selectedDate = this.formatDate(new Date())

				// 初始化时间字符串
				this.startTimeStr = '09:00'
				this.endTimeStr = '21:00'
			}
		},
		mounted() {
			this.initDateTime()
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

	.picker {
		margin-top: 10px;
		border-bottom: 1px dashed #e0e0e0;
		padding: 8px 0;
	}
</style>