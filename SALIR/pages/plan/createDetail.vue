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
					<view style="flex: 1; position: relative; width: 180px;">
						<view style="color: #999; font-size: 13px;">日期</view>
						<view class="form-input">2025年3月15日</view>
					</view>
					<view style="flex: 1; display: flex; gap: 8px;">

						<view style="flex: 1;">
							<view style="color: #999; font-size: 13px;">开始</view>
							<view class="form-input">09:00</view>
						</view>
						<view style="flex: 1;">
							<view style="color: #999; font-size: 13px;">结束</view>
							<view class="form-input">21:00</view>
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
						<image :src="item.code == runtype ? item.cicon:item.dicon" style="width: 25px;height:25px;" />
						<view :style="{
      fontSize: '12px',
      marginTop: '4px',
      color: item.code == runtype ? item.ctxtcolor:item.dtxtcolor
    }">{{item.name}}</view>
					</view>
				</view>
			</view>

			<view style="margin-top: 24px;">
				<view style="display: flex; justify-content: space-between; align-items: center;">
					<view style="font-size: 16px; font-weight: 500;" class="titletip">提醒通知</view>
					<van-switch :checked="checked" @change="onSwitchChange" />
				</view>
				<view style="margin-top: 12px; display: flex; gap: 8px;">
					<van-tag type="primary" size="medium" style="margin-left: 8px;" :plain="t.min !== time"
						@click="onTime(t)" v-for="t in runtime">{{t.option}}</van-tag>
				</view>
			</view>

			<view style="margin-top: 24px;">
				<view style="font-size: 16px; font-weight: 500; margin-bottom: 8px;" class="titletip">地点</view>
				<input type="text" class="form-input" value="日本东京迪士尼乐园">
				<view style="color: #999; font-size: 13px; margin-top: 8px;">
					日本千葉県浦安市舞浜1-1
				</view>
			</view>

			<view style="margin-top: 24px;">
				<view style="font-size: 16px; font-weight: 500; margin-bottom: 8px;" class="titletip">备注</view>
				<textarea class="form-input" style="height: 100px;"
					placeholder="添加日程备注信息...">提前官网购票，避开周末节假日人流高峰。迪士尼海洋和乐园二选一。</textarea>
			</view>
		</view>
	</view>
</template>

<script>
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
				checked: true
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
				console.log(e)
			}
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
</style>