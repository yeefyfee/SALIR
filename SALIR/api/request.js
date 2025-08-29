// 添加请求队列和防抖控制
const pendingRequests = new Map();

// 生成请求的唯一key
function generateRequestKey(opt) {
	return `${opt.servername}_${JSON.stringify(opt.params)}`;
}

// 检查是否是重复请求
function isDuplicateRequest(key) {
	return pendingRequests.has(key);
}

// 添加请求到队列
function addRequest(key, promise) {
	pendingRequests.set(key, promise);
}

// 从队列中移除请求
function removeRequest(key) {
	pendingRequests.delete(key);
}

//实体解码
function decodeHtmlEntities(str) {
	if (typeof str !== 'string') return str;
	const entities = {
		'&amp;': '&',
		'&lt;': '<',
		'&gt;': '>',
		'&quot;': '"',
		'&#39;': "'",
		'&#x27;': "'",
		'&#x60;': '`'
	};
	return str.replace(/&[#\w]+;/g, match => entities[match] || match);
}
//处理字符串
function decodeJsonEntities(obj) {
	if (typeof obj !== 'object' || obj === null) {
		return decodeHtmlEntities(obj);
	}

	if (Array.isArray(obj)) {
		return obj.map(item => decodeJsonEntities(item));
	}

	const decodedObj = {};
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			decodedObj[key] = decodeJsonEntities(obj[key]);
		}
	}
	return decodedObj;
}
export function requestHttp(opt) {
	const requestKey = generateRequestKey(opt);

	// 检查是否是重复请求
	if (isDuplicateRequest(requestKey)) {
		console.log(`【${opt.servername}】检测到重复请求,已阻止`);
		return pendingRequests.get(requestKey);
	}

	const promise = new Promise((resolute, reject) => {
		try {
			var that = Vue.prototype;
			let requestUrl = that.RequestURL + opt.servername
			console.log("Request【" + requestUrl + "】 INFO JSON:" + JSON.stringify(opt.params))
			uni.request({
				url: requestUrl,
				data: opt.params,
				method: opt.method,
				success: (res) => {
					console.log("Response【" + requestUrl + "】 INFO JSON:" + JSON.stringify(res
						.data))
					resolute(res.data)
				},
				fail: (err) => {
					reject(err);
				},
				complete: () => {
					removeRequest(requestKey);
				}
			})
		} catch (err) {
			console.log(err);
			removeRequest(requestKey);
			reject(err);
		}
	});

	// 将请求添加到队列
	addRequest(requestKey, promise);
	return promise;
}