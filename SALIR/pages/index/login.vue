<template>
	<view class="login-page">
		<!-- 背景层 -->
		<view class="bg-layer">
			<view class="bg-gradient"></view>
			<view class="bg-pattern"></view>
		</view>

		<!-- 登录容器 -->
		<view class="login-container">
			<!-- 应用Logo -->
			<view class="app-logo">
				<view class="logo-icon">
					<text class="icon-text">SALIR</text>
				</view>
				<view class="app-name">快捷登录</view>
			</view>

			<!-- 手机号快速登录按钮 -->
			<input type="text" class="rounded-input" placeholder="请输入手机号" placeholder-style="color:white;opacity: 0.6;"
				maxlength="11" v-model="phone" />
			<button class="phone-login-btn" @click="login()">
				<view class="btn-content">
					<van-icon name="phone" style="font-size: 20px;" />
					<text>一键登录</text>
				</view>
			</button>

			<!-- 其他登录方式 -->
			<view class="other-options">
				<view class="divider">
					<view class="line"></view>
					<text class="text">其他登录方式</text>
					<view class="line"></view>
				</view>

				<view class="other-methods">
					<view class="method-item">
						<icon type="logo-weixin" size="24" class="method-icon"></icon>
						<text>微信登录</text>
					</view>
				</view>
			</view>

			<!-- 隐私协议 -->
			<view class="privacy-policy">
				<text>登录即表示同意</text>
				<text class="policy-link">《用户协议》</text>
				<text>和</text>
				<text class="policy-link">《隐私政策》</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		requestHttp
	} from '../../api/request.js'
	export default {
		data() {
			return {
				phone: ''
			};
		},
		onLoad() {},
		methods: {
			isPhoneValid(phone) {
				return /^1[3-9]\d{9}$/.test(phone);
			},
			login() {
				if (this.phone.length <= 0) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'error'
					})
					return;
				}

				if (!this.isPhoneValid(this.phone)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					});
					return;
				}

				const opt = {
					servername: 'api/TsUser/Login',
					params: {
						phone: this.phone
					},
					method: 'get'
				}
				requestHttp(opt).then(res => {
					if (res.success) {
						uni.showToast({
							title: '登录成功',
							icon: 'success'
						})
						uni.setStorageSync('UserInfo', res.data[0])
						uni.reLaunch({
							url: '/pages/index/index'
						})
					}
				})
			}
		}
	};
</script>

<style scoped>
	.login-page {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		position: relative;
	}

	/* 背景样式 */
	.bg-layer {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 0;
	}

	.bg-gradient {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, #3498db 0%, #9b59b6 100%);
		opacity: 0.9;
	}

	.bg-pattern {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMCBaIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIzNCIgY3k9IjM0IiByPSIzIi8+PGNpcmNsZSBjeD0iMTUiIGN5PSIxNSIgcj0iMyIvPjwvZz48L3N2Zz4=');
		opacity: 0.1;
	}

	/* 登录容器 */
	.login-container {
		flex: 1;
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	/* 应用Logo */
	.app-logo {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 80rpx;
	}

	.logo-icon {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
		margin-bottom: 20rpx;
	}

	.icon-text {
		font-size: 40rpx;
		font-weight: bold;
		color: #6c63ff;
	}

	.app-name {
		font-size: 30rpx;
		font-weight: 600;
		color: #ffffff;
		text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
	}

	/* 手机号登录按钮 */
	.phone-login-btn {
		width: 100%;
		height: 90rpx;
		background-color: #ffffff;
		color: #6c63ff;
		border-radius: 45rpx;
		font-size: 32rpx;
		font-weight: 500;
		margin-bottom: 60rpx;
		box-shadow: 0 8rpx 24rpx rgba(108, 99, 255, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.btn-content {
		display: flex;
		align-items: center;
	}

	/* 其他登录方式 */
	.other-options {
		width: 100%;
		margin-bottom: 80rpx;
	}

	.divider {
		display: flex;
		align-items: center;
		margin-bottom: 40rpx;
	}

	.line {
		flex: 1;
		height: 1rpx;
		background-color: rgba(255, 255, 255, 0.3);
	}

	.divider .text {
		padding: 0 20rpx;
		font-size: 24rpx;
		color: rgba(255, 255, 255, 0.7);
	}

	.other-methods {
		display: flex;
		justify-content: center;
		gap: 60rpx;
	}

	.method-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #ffffff;
		font-size: 24rpx;
		opacity: 0.9;
	}

	.method-icon {
		margin-bottom: 10rpx;
	}

	/* 隐私协议 */
	.privacy-policy {
		font-size: 22rpx;
		color: rgba(255, 255, 255, 0.7);
		text-align: center;
		line-height: 1.5;
		padding: 0 20rpx 30rpx;
	}

	.policy-link {
		color: #ffffff;
		text-decoration: underline;
		margin: 0 5rpx;
	}

	.loading-spinner {
		margin-bottom: 20rpx;
	}

	/* 动画效果 */
	.phone-login-btn {
		transition: all 0.3s ease;
	}

	.phone-login-btn:active {
		transform: scale(0.98);
		box-shadow: 0 4rpx 16rpx rgba(108, 99, 255, 0.2);
	}

	.method-item {
		transition: all 0.3s ease;
	}

	.method-item:active {
		transform: scale(0.95);
	}

	.logo-icon {
		animation: pulse 2s infinite;
	}

	.rounded-input {
		height: 40px;
		border-radius: 999px;
		/* 超大值，自动适配高度为胶囊形 */
		border: 1px solid #ddd;
		padding: 0 66px;
		width: 320px;
		outline: none;
		margin-bottom: 10px;
		color: #6c63ff;
		font-weight: bold;
		text-align: center;
	}


	@keyframes pulse {
		0% {
			box-shadow: 0 0 0 0 rgba(108, 99, 255, 0.4);
		}

		70% {
			box-shadow: 0 0 0 20rpx rgba(108, 99, 255, 0);
		}

		100% {
			box-shadow: 0 0 0 0 rgba(108, 99, 255, 0);
		}
	}
</style>