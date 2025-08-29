<template>
	<view class="mine-page">
		<!-- 顶部导航栏 -->
		<view class="weibo-nav titletip">
			<text class="nav-title">我的</text>
		</view>

		<!-- 用户信息区域 -->
		<view class="user-header">
			<!-- 头像和基本信息 -->
			<view class="user-info">
				<view class="avatar-wrap">
					<image :src="userInfo.avatar" class="avatar" mode="aspectFill"></image>
					<view class="avatar-upload" @click="chooseAvatar">
						<uni-icons type="camera" size="18" color="#fff"></uni-icons>
					</view>
				</view>

				<view class="user-main-info">
					<view class="user-name-wrap">
						<text class="user-name">{{ userInfo.name || '未设置昵称' }}</text>
						<van-button type="default" size="small" round @click="inputDialogToggle">编辑资料</van-button>
					</view>
					<text class="user-desc" v-if="!userInfo.phone" @click="inputDialogTophone()">点击绑定手机号，开启更多功能</text>
					<!-- 数据统计 -->
					<view class="user-stats" v-else>
						<view class="stat-item" v-for="user in userInfo.tips">
							<van-tag type="primary" size="large" color="#ffe1e1"
								text-color="#ad0000">{{user.option}}</van-tag>
						</view>
					</view>
				</view>
			</view>


		</view>

		<!-- 功能列表 -->
		<view class="function-list">
			<!-- 手机号项 -->
			<view class="list-item" @click="showPhoneInput = true">
				<view class="item-left">
					<uni-icons type="phone" size="20" color="#666"></uni-icons>
					<text class="item-text">手机号</text>
				</view>
				<view class="item-right">
					<text>{{ userInfo.phone || '未绑定' }}</text>
					<uni-icons type="right" size="16" color="#ccc"></uni-icons>
				</view>
			</view>

			<!-- 版本信息项 -->
			<view class="list-item">
				<view class="item-left">
					<uni-icons type="info" size="20" color="#666"></uni-icons>
					<text class="item-text">应用版本</text>
				</view>
				<view class="item-right">
					<text> {{ appVersion }}</text>
					<uni-icons type="right" size="16" color="#ccc"></uni-icons>
				</view>
			</view>

			<view class="list-item" @click="exitLogin()">
				<view class="item-left">
					<text class="item-text">退出登录</text>
				</view>
				<view class="item-right">
					<uni-icons type="right" size="16" color="#ccc"></uni-icons>
				</view>
			</view>
		</view>

		<view>
			<uni-popup ref="phoneDialog" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" title="绑定手机号" :value="userInfo.iphone"
					:maxlength="maxphone" placeholder="请输入内容" @confirm="editPhone"></uni-popup-dialog>
			</uni-popup>
		</view>

		<view>
			<uni-popup ref="inputDialog" type="dialog">
				<uni-popup-dialog ref="inputClose" mode="input" title="编辑名称" :value="userInfo.name" :maxlength="maxname"
					placeholder="请输入内容" @confirm="editName"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {
		showModalWithAwait,
		pathToBase64
	} from '../../common/helper.js'
	import {
		requestHttp
	} from '../../api/request.js';
	export default {
		data() {
			return {
				// 用户信息
				userInfo: {
					id: '',
					avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
					name: '',
					phone: '',

					tips: [{
							option: '自由'
						},
						{
							option: '无厘头'
						},
						{
							option: 'MBTI'
						}
					]
				},
				maxphone: 11,
				maxname: 6,
				// 应用版本
				appVersion: '12.1.1', // 微博常见版本号格式
				// 弹窗控制
				showPhoneInput: false,
				showNameInput: false,
				showLogoutConfirm: false,
				// 表单数据
				phoneNumber: '',
				userName: ''
			}
		},

		onLoad() {

			// 获取应用版本信息
			this.getAppVersion();
		},

		methods: {
			// 加载用户信息
			loadUserInfo() {
				const savedUser = uni.getStorageSync('UserInfo');
				console.log(savedUser)
				const that = Vue.prototype;
				if (savedUser) {
					this.userInfo.id = savedUser.id
					this.userInfo.avatar = that.ImgsURL + (!savedUser.head_Img ? 'default_head.png' :
						savedUser.head_Img)
					this.userInfo.name = savedUser.userName;
					this.userInfo.phone = savedUser.phone;
					const t = savedUser.tag.split(';')
					this.userInfo.tips = []
					for (var i = 0; i < t.length; i++) {
						this.userInfo.tips.push({
							option: t[i]
						})
					}
				}
			},

			// 获取应用版本
			getAppVersion() {
				// 实际项目中可以通过plus.runtime获取版本号
				// #ifdef APP-PLUS
				this.appVersion = plus.runtime.version;
				// #endif
			},

			// 选择头像
			chooseAvatar() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						const tempFilePath = res.tempFilePaths[0];
						this.ImgToBase64(tempFilePath).then(base64 => {
							const opt = {
								servername: 'api/TsUser/ModifyHeadImg',
								params: {
									Id: this.userInfo.id,
									Img: base64
								},
								method: 'post'
							}
							requestHttp(opt).then(res => {
								let user = uni.getStorageSync('UserInfo')
								user.head_Img = res.data
								uni.setStorageSync('UserInfo', user)
							})
						})
						// 显示新头像
						this.userInfo.avatar = tempFilePath;
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
			// 编辑名称
			editName(e) {
				this.userInfo.name = e
				const opt = {
					servername: 'api/TsUser/ModifyUserName',
					params: {
						id: this.userInfo.id,
						username: e
					},
					method: 'get'
				}
				requestHttp(opt).then(res => {
					let user = uni.getStorageSync('UserInfo')
					user.userName = e
					uni.setStorageSync('UserInfo', user)
				})
			},
			editPhone(e) {
				this.userInfo.phone = e
			},
			inputDialogTophone() {
				this.$refs.phoneDialog.open()
			},
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},
			async exitLogin() {
				var res = await showModalWithAwait('是否确认退出登录?')
				if (res.cancel) {
					return;
				}
				uni.removeStorage('UserInfo')

				uni.reLaunch({
					url: '/pages/index/login'
				})
			}
		},
		mounted() {
			// 从本地存储加载用户信息
			this.loadUserInfo();
		}
	}
</script>

<style scoped>
	.mine-page {
		min-height: 100vh;
		background-color: #f5f5f5;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
	}

	/* 导航栏样式 - 仿照微博 */
	.weibo-nav {
		height: 44px;
		background-color: #fff;
		border-bottom: 1px solid #eee;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 16px;
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.nav-title {
		font-size: 18px;
		font-weight: 600;
		color: #141414;
	}

	.nav-actions {
		display: flex;
		align-items: center;
	}

	/* 用户信息区域 */
	.user-header {
		background-color: #fff;
		padding: 16px;
		border-bottom: 10px solid #f5f5f5;
	}

	.user-info {
		display: flex;
		margin-bottom: 16px;
	}

	/* 头像样式 */
	.avatar-wrap {
		position: relative;
		width: 80px;
		height: 80px;
		margin-right: 16px;
	}

	.avatar {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 1px solid #eee;
	}

	.avatar-upload {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 26px;
		height: 26px;
		background-color: #ff2442;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid #fff;
	}

	/* 用户基本信息 */
	.user-main-info {
		flex: 1;
	}

	.user-name-wrap {
		display: flex;
		align-items: center;
		margin-bottom: 8px;
	}

	.user-name {
		font-size: 18px;
		font-weight: 600;
		color: #141414;
		margin-right: 10px;
	}

	.edit-btn {
		background-color: transparent;
		color: #666;
		border: 1px solid #ddd;
		border-radius: 14px;
		padding: 0 12px;
		height: 28px;
		line-height: 26px;
		font-size: 14px;
		white-space: nowrap;
	}

	.user-desc {
		font-size: 14px;
		color: #666;
		line-height: 1.4;
	}

	/* 数据统计 */
	.user-stats {
		display: flex;
		justify-content: flex-start;
		padding-top: 12px;
		border-top: 1px solid #f5f5f5;
	}

	.stat-item {
		margin-right: 10px;
		text-align: center;
	}

	.stat-number {
		font-size: 18px;
		font-weight: 600;
		color: #141414;
		display: block;
		margin-bottom: 4px;
	}

	.stat-label {
		font-size: 14px;
		color: #666;
	}

	/* 功能列表 */
	.function-list {
		background-color: #fff;
		margin-bottom: 10px;
	}

	.list-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 14px 16px;
		border-bottom: 1px solid #f5f5f5;
	}

	.list-item:last-child {
		border-bottom: none;
	}

	.item-left {
		display: flex;
		align-items: center;
	}

	.item-text {
		margin-left: 14px;
		font-size: 16px;
		color: #141414;
	}

	.item-right {
		display: flex;
		align-items: center;
		color: #999;
		font-size: 14px;
	}

	.item-right text {
		margin-right: 8px;
	}

	/* 退出登录按钮 */
	.logout-btn {
		width: 90%;
		margin: 20px auto;
		display: block;
		background-color: transparent;
		color: #ff2442;
		border: 1px solid #ff2442;
		border-radius: 4px;
		height: 44px;
		line-height: 42px;
		font-size: 16px;
	}

	/* 弹窗样式 */
	.popup-content {
		width: 85%;
		background-color: #fff;
		border-radius: 8px;
		padding: 20px;
	}

	.confirm-popup {
		width: 85%;
		max-width: 300px;
		background-color: #fff;
		border-radius: 8px;
		padding: 20px;
	}

	.popup-title {
		font-size: 18px;
		color: #141414;
		text-align: center;
		margin-bottom: 20px;
		font-weight: 500;
	}

	.confirm-text {
		font-size: 16px;
		color: #141414;
		text-align: center;
		margin-bottom: 20px;
		padding: 10px 0;
	}

	.input-container {
		display: flex;
		align-items: center;
		border: 1px solid #eee;
		border-radius: 4px;
		padding: 0 12px;
		height: 44px;
		margin-bottom: 20px;
	}

	.phone-input,
	.name-input {
		flex: 1;
		height: 100%;
		font-size: 16px;
		padding-left: 10px;
	}

	.popup-buttons,
	.confirm-buttons {
		display: flex;
		justify-content: space-between;
	}

	.popup-buttons button,
	.confirm-buttons button {
		flex: 1;
		height: 44px;
		line-height: 44px;
		border-radius: 4px;
		font-size: 16px;
		margin: 0 5px;
	}

	.cancel-btn {
		background-color: #f5f5f5;
		color: #666;
	}

	.confirm-btn {
		background-color: #ff2442;
		color: #fff;
	}

	.logout-confirm-btn {
		background-color: #ff2442;
		color: #fff;
	}
</style>