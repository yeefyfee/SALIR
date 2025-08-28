<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			const userinfo = uni.getStorageSync('UserInfo')
			if (!userinfo) {
				uni.reLaunch({
					url: '/pages/index/login'
				})
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "@/wxcomponents/vant/dist/common/index.wxss";
	@import "@/wxcomponents/vant/dist/icon/index.wxss";
	@import "@/wxcomponents/vant/dist/button/index.wxss";
	@import "@/wxcomponents/vant/dist/tag/index.wxss";
	@import "@/wxcomponents/vant/dist/nav-bar/index.wxss";
	@import "@/wxcomponents/vant/dist/empty/index.wxss";
	@import "@/wxcomponents/vant/dist/switch/index.wxss";
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-family: 'Inter', 'SF Pro', -apple-system, sans-serif;
	}

	.header {
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 16px;
		border-bottom: 1px solid #eee;
		background: white;
		z-index: 10;
	}

	.titletip {
		color: #007AFF;
		font-weight: bold;
	}
</style>