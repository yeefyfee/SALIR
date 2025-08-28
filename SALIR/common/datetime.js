/**
 * 自定义多列时间选择器
 */
function withData(param) {
	return param < 10 ? '0' + param : '' + param;
}

function getLoopArray(start, end) {
	var start = start || 0;
	var end = end || 1;
	var array = [];
	for (var i = start; i <= end; i++) {
		array.push(withData(i));
	}
	return array;
}

function getMonthDay(year, month) {
	var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0),
		array = null;

	switch (month) {
		case '01':
		case '03':
		case '05':
		case '07':
		case '08':
		case '10':
		case '12':
			array = getLoopArray(1, 31)
			break;
		case '04':
		case '06':
		case '09':
		case '11':
			array = getLoopArray(1, 30)
			break;
		case '02':
			array = flag ? getLoopArray(1, 29) : getLoopArray(1, 28)
			break;
		default:
			array = '月份格式不正确，请重新输入！'
	}
	return array;
}

function getNewDateArry() {
	// 当前时间的处理
	var newDate = new Date();
	var year = withData(newDate.getFullYear()),
		mont = withData(newDate.getMonth() + 1),
		date = withData(newDate.getDate()),
		hour = withData(newDate.getHours()),
		minu = withData(newDate.getMinutes()),
		seco = withData(newDate.getSeconds());

	return [year, mont, date, hour, minu, seco];
}

function dateTimePicker(startYear, endYear, date) {
	// 返回默认显示的数组和联动数组的声明
	var dateTime = [],
		dateTimeArray = [
			[],
			[],
			[],
			[],
			[],
			[]
		];
	var start = startYear || 2000;
	var end = endYear || 2100;
	// 默认开始显示数据
	var defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : getNewDateArry();
	// 处理联动列表数据
	/*年月日 时分秒*/
	dateTimeArray[0] = getLoopArray(start, end);
	dateTimeArray[1] = getLoopArray(1, 12);
	dateTimeArray[2] = getMonthDay(defaultDate[0], defaultDate[1]);
	dateTimeArray[3] = getLoopArray(0, 23);
	dateTimeArray[4] = getLoopArray(0, 59);
	dateTimeArray[5] = getLoopArray(0, 59);

	dateTimeArray.forEach((current, index) => {
		dateTime.push(current.indexOf(defaultDate[index]));
	});

	return {
		dateTimeArray: dateTimeArray,
		dateTime: dateTime
	}
}

function dtPickerShort(startYear, endYear, date) {
	// 返回默认显示的数组和联动数组的声明
	var dateTime = [],
		dateTimeArray = [
			[],
			[],
			[]
		];
	var start = startYear || 2000;
	var end = endYear || 2100;
	// 默认开始显示数据
	let defaultDate = [];
	if (date) {
		const [datePart, timePart = "00:00"] = date.split(' '); // 时间部分默认值 "00:00"
		const yearMonthDay = datePart.split('-'); // 拆分年月日
		const hourMinute = timePart.split(':'); // 拆分时分（此时timePart不会是undefined）
		defaultDate = [...yearMonthDay, ...hourMinute]; // 合并数组
	} else {
		defaultDate = getNewDateArry(); // 无date时用默认日期
	}
	// 处理联动列表数据
	/*年月日 时分秒*/
	dateTimeArray[0] = getLoopArray(start, end);
	dateTimeArray[1] = getLoopArray(1, 12);
	dateTimeArray[2] = getMonthDay(defaultDate[0], defaultDate[1]);

	dateTimeArray.forEach((current, index) => {
		dateTime.push(current.indexOf(defaultDate[index]));
	});

	return {
		dateTimeArray: dateTimeArray,
		dateTime: dateTime
	}
}

// 根据开始和结束日期生成日期选择器数组
function dtPickerWithRange(startDate, endDate) {
	var dateTime = [],
		dateTimeArray = [
			[],
			[],
			[]
		];

	// 解析开始和结束日期
	var start = new Date(startDate);
	var end = new Date(endDate);

	// 生成年份数组
	var startYear = start.getFullYear();
	var endYear = end.getFullYear();
	dateTimeArray[0] = getLoopArray(startYear, endYear);

	// 生成月份数组（根据年份范围调整）
	var months = [];
	for (var year = startYear; year <= endYear; year++) {
		var monthStart = year === startYear ? start.getMonth() + 1 : 1;
		var monthEnd = year === endYear ? end.getMonth() + 1 : 12;
		for (var month = monthStart; month <= monthEnd; month++) {
			months.push(withData(month));
		}
	}
	dateTimeArray[1] = months;

	// 生成日期数组（默认使用当前月份的天数）
	dateTimeArray[2] = getMonthDay(startYear.toString(), withData(start.getMonth() + 1));

	// 设置默认选中值
	dateTime[0] = 0; // 默认选中第一个年份
	dateTime[1] = 0; // 默认选中第一个月份
	dateTime[2] = 0; // 默认选中第一天

	return {
		dateTimeArray: dateTimeArray,
		dateTime: dateTime
	}
}
/**格式化日期 */
function generateTimeStr(dateTimeArray, dateTime) {
	const year = dateTimeArray[0][dateTime[0]];
	const month = dateTimeArray[1][dateTime[1]];
	const day = dateTimeArray[2][dateTime[2]];

	const timeStr = year + "年" + month + "月" + day + "日";
	return timeStr;
}

function formatDate(date) {
	let yyyy = date.getFullYear();
	let mm = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的
	let dd = date.getDate().toString().padStart(2, '0');
	let hh = date.getHours().toString().padStart(2, '0');
	let mi = date.getMinutes().toString().padStart(2, '0');
	let ss = date.getSeconds().toString().padStart(2, '0');

	return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

function parseDateString(dateStr, type) {

	const str = new Date(dateStr.substr(0, 10))
	const year = str.getFullYear();
	const month = (str.getMonth() + 1).toString().padStart(2, '0');
	const day = str.getDate().toString().padStart(2, '0');
	let res = year + '年' + month + '月' + day + '日';
	if (type == 'M') {
		res = month + '月' + day + '日'
	}
	return res;
}

module.exports = {
	dateTimePicker,
	getMonthDay,
	generateTimeStr,
	formatDate,
	dtPickerShort,
	dtPickerWithRange,
	parseDateString
};