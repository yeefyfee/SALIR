<template>
	<div class="container">
		<div class="content">
			<component :is="currentTab"></component>
		</div>
		<div class="tabbar">
			<div v-for="tab in tabs" :key="tab.name" :class="['tab-item', { active: currentTab === tab.component }]"
				@click="currentTab = tab.component">
				<span>{{ tab.label }}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import Home from './Home.vue'
	import Calendar from './Calendar.vue'
	import me from './me.vue'

	export default {
		components: {
			Home,
			Calendar,
			me
		},
		data() {
			return {
				tabs: [{
						name: 'home',
						label: '首页',
						component: 'Home'
					},
					{
						name: 'calendar',
						label: '日历',
						component: 'calendar'
					},
					{
						name: 'me',
						label: '我的',
						component: 'me'
					}
				],
				currentTab: 'Home'
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
	.content {
		flex: 1;
		overflow: hidden;
		min-height: 0;
		margin-top: 40px;
	}

	.tabbar {
		display: flex;
		height: 60px;
		border-top: 1px solid #eee;
		background: #fff;
	}

	.tab-item {
		flex: 1;
		text-align: center;
		line-height: 60px;
		color: #888;
		cursor: pointer;
	}

	.tab-item.active {
		color: #007aff;
		font-weight: bold;
	}
</style>