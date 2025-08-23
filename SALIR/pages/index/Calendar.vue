<template>
	<view>
		<view style="font-size: 18px; font-weight: 700;" class="titletip">{{dDate}}</view>
		<uni-datepicker></uni-datepicker>
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
				dDate: ''
			}
		},
		methods: {
			init() {
				const dt = this.formatDate(new Date())
				this.dDate = dt;
			},
			formatDate(date) {
				const year = date.getFullYear();
				const month = (date.getMonth() + 1).toString().padStart(2, '0');
				const day = date.getDate().toString().padStart(2, '0');
				return `${year}年${month}月`;
			}
		},
		mounted() {
			this.init()
		}
	}
</script>

<style>
	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}

	.hide-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>