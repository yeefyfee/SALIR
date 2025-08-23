<template>
	<view class="calendar-container">
		<!-- 带背景色的标题 -->
		<view class="title-bar">{{ dDate }}</view>

		<!-- 日历组件 -->
		<uni-calendar ref="calendar" :selected="runList" :showMonth="false" @change="onDateChange"
			@monthSwitch="onMonthSwitch"></uni-calendar>

		<view style="margin-top: 24px; font-weight: 700; font-size: 18px;" class="titletip">{{dDay}}</view>

		<view class="card" style="margin-top: 12px;" v-for="d in planDtl">
			<view style="display: flex; align-items: center;">
				<view style="width: 50px; display: flex; flex-direction: column; align-items: center;">
					<view style="font-size: 15px; font-weight: 500">{{d.beginMin}}</view>
					<view style="width: 2px; height: 40px; background: #165DFF; margin: 4px 0;"></view>
					<view style="font-size: 15px;">{{d.endMin}}</view>
				</view>
				<view style="flex: 1; padding: 0 12px;">
					<view style="font-weight: 500; font-size: 16px;">{{d.target}}</view>
					<view style="color: #999; margin-top: 4px;">{{d.remark}}</view>
					<view style="display: flex; gap: 8px; margin-top: 8px;">
						<van-tag type="primary">交通：{{d.runtype}}</van-tag>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dDate: '',
				dDay: '',
				runList: [{
					date: '2025-08-23',
					info: '值班',
					color: '#007AFF',
					data: [{
							beginMin: '09:00',
							endMin: '21:00',
							target: '东京迪士尼乐园',
							remark: '游玩主题乐园和观看烟火表演',
							runtype: '自驾'
						},
						{
							beginMin: '18:30',
							endMin: '20:00',
							target: '迪士尼主题餐厅晚餐',
							remark: '需要提前预定的餐厅',
							runtype: '步行'
						},
						{
							beginMin: '21:00',
							endMin: '23:00',
							target: '回家',
							remark: '提前叫车排队',
							runtype: '自驾'
						}
					]
				}, {
					date: '2025-08-25',
					info: '发工资',
					color: '#007AFF',
					data: [{
							beginMin: '08:00',
							endMin: '09:00',
							target: '上班',
							remark: '早出门',
							runtype: '自驾'
						},
						{
							beginMin: '18:30',
							endMin: '20:00',
							target: '去财务领工资',
							remark: '早点去',
							runtype: '步行'
						}
					]
				}],
				planDtl: []
			}
		},
		methods: {
			init() {
				const today = new Date()
				console.log(today)
				this.dDate = this.formatMonth(today)
				if (this.runList.length > 0) {
					const defaultDateItem = this.runList[0]; // 示例中是 {date: '2025-08-23', ...}
					const [defaultYear, defaultMonth, defaultDate] = defaultDateItem.date.split('-'); // 拆分日期：2025、08、23
					this.dDay = `${defaultMonth}月${defaultDate}日`;
					this.planDtl = defaultDateItem.data || [];
				} else {
					this.dDay =
						`${(today.getMonth()+1).toString().padStart(2, '0')}月${today.getDate().toString().padStart(2, '0')}日`;
					this.planDtl = [];
				}
			},
			formatMonth(date) {
				const year = date.getFullYear()
				const month = (date.getMonth() + 1).toString().padStart(2, '0')
				return `${year}年${month}月`
			},
			onDateChange(e) {
				console.log(e.extraInfo.data)
				this.dDay = `${e.month}月${e.date}日`
				this.planDtl = e.extraInfo.data
			},
			onMonthSwitch(e) {
				this.dDate = `${e.year}年${e.month.toString().padStart(2, '0')}月`
			}
		},
		mounted() {
			this.init()
		}
	}
</script>

<style scoped>
	.calendar-container {
		width: 100%;
		min-height: 100vh;
		background-color: #f5f5f5;
	}

	/* 带背景色的标题样式 */
	.title-bar {
		font-size: 18px;
		font-weight: 700;
		padding: 16px;
		/* 内边距 */
		background-color: #e8f3ff;
		/* 淡蓝色背景 */
		color: #007AFF;
		/* 文字颜色与主题呼应 */
		border-radius: 8px 8px 0 0;
		/* 顶部圆角 */
		margin-bottom: 1px;
		/* 与日历无缝衔接 */
	}

	/* 日历组件样式调整 */
	::v-deep .uni-calendar__date--selected {
		background-color: #e8f3ff !important;
	}

	::v-deep .uni-calendar__schedule {
		background-color: #007AFF !important;
	}
</style>