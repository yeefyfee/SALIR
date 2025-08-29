#SALIR
闲来写个女朋友用的一个出行app，以下是原型图<br>
<!DOCTYPE html><html lang="zh-CN"><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Inter', 'SF Pro', -apple-system, sans-serif;
        }
        body {
            background-color: #f0f2f5;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            padding: 20px;
            gap: 35px;
        }
        .page {
            width: 375px;
            height: 812px;
            display: flex;
            flex-direction: column;
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 16px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            overflow: hidden;
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
        .footer {
            height: 80px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-top: 1px solid #eee;
            background: white;
        }
        .content {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
        }
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .btn-primary {
            background: #165DFF;
            color: white;
            border-radius: 8px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
        }
        .card {
            background: white;
            border-radius: 16px;
            padding: 16px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            border: 1px solid #eee;
            margin-bottom: 12px;
        }
        .tag {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            background: #e6f0ff;
            color: #165DFF;
        }
        .form-input {
            width: 100%;
            padding: 12px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            margin-top: 8px;
            font-size: 16px;
        }
        .toggle-switch {
            width: 50px;
            height: 28px;
            background: #ddd;
            border-radius: 14px;
            position: relative;
            cursor: pointer;
        }
        .toggle-switch.active {
            background: #165DFF;
        }
        .toggle-switch::before {
            content: '';
            width: 24px;
            height: 24px;
            background: white;
            border-radius: 50%;
            position: absolute;
            top: 2px;
            left: 2px;
            transition: all 0.3s;
        }
        .toggle-switch.active::before {
            left: 24px;
        }
    </style>
</head>
<body>
    <!-- 页面1: 首页行程列表 -->
    <div class="page">
        <div class="header">
            <div style="font-size: 18px; font-weight: 700;">我的行程</div>
            <div style="position: relative">
                <div class="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                    <iconify-icon icon="mdi:plus" style="color: white; font-size: 24px;"></iconify-icon>
                </div>
            </div>
        </div>
        
        <div class="content hide-scrollbar">
            <div style="text-align: center; padding: 100px 20px;">
                <div class="text-gray-500 mb-4">暂无行程计划</div>
                <div class="text-gray-400 text-sm">点击下方"+"按钮创建新行程</div>
            </div>

            <!-- 行程卡片示例 -->
            <div class="card">
                <div style="display: flex;">
                    <img id="1" src="https://modao.cc/ai/uploads/ai_pics/15/154327/aigp_1755675816.jpeg" alt="travel to Tokyo" style="width: 100px; height: 100px; border-radius: 8px; object-fit: cover; margin-right: 16px;">
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="font-weight: 700; font-size: 18px;">东京樱花之旅</div>
                            <iconify-icon icon="mdi:chevron-right" style="font-size: 24px; color: #999;"></iconify-icon>
                        </div>
                        <div style="color: #666; margin: 8px 0;">3月15日 - 3月20日</div>
                        <div style="display: flex;">
                            <div class="tag">购物</div>
                            <div class="tag" style="margin-left: 8px;">美食</div>
                        </div>
                        <div style="color: #999; font-size: 13px; margin-top: 8px;">
                            东京、大阪、京都
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div style="display: flex;">
                    <img id="2" src="https://modao.cc/ai/uploads/ai_pics/15/154328/aigp_1755675818.jpeg" alt="Hawaii beach vacation" style="width: 100px; height: 100px; border-radius: 8px; object-fit: cover; margin-right: 16px;">
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="font-weight: 700; font-size: 18px;">夏威夷海滩度假</div>
                            <iconify-icon icon="mdi:chevron-right" style="font-size: 24px; color: #999;"></iconify-icon>
                        </div>
                        <div style="color: #666; margin: 8px 0;">5月22日 - 5月30日</div>
                        <div style="display: flex;">
                            <div class="tag">海滩</div>
                            <div class="tag" style="margin-left: 8px;">度假</div>
                        </div>
                        <div style="color: #999; font-size: 13px; margin-top: 8px;">
                            檀香山、茂宜岛
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div style="text-align: center;">
                <iconify-icon icon="mdi:home" style="font-size: 24px; color: #165DFF;"></iconify-icon>
                <div style="font-size: 12px; color: #165DFF; margin-top: 4px;">行程</div>
            </div>
            <div style="text-align: center; color: #999;">
                <iconify-icon icon="mdi:calendar" style="font-size: 24px;"></iconify-icon>
                <div style="font-size: 12px; margin-top: 4px;">日历</div>
            </div>
            <div style="text-align: center; color: #999;">
                <iconify-icon icon="mdi:cog" style="font-size: 24px;"></iconify-icon>
                <div style="font-size: 12px; margin-top: 4px;">设置</div>
            </div>
        </div>
    </div>

    <!-- 页面2: 总计划创建/编辑 -->
    <div class="page">
        <div class="header">
            <iconify-icon icon="mdi:arrow-left" style="font-size: 24px;"></iconify-icon>
            <div style="font-size: 18px; font-weight: 700;">新建行程计划</div>
            <div style="color: #165DFF; font-weight: 500;">保存</div>
        </div>
        
        <div class="content hide-scrollbar">
            <div style="margin-bottom: 24px;">
                <div style="font-size: 16px; font-weight: 500; margin-bottom: 8px;">计划名称</div>
                <input type="text" class="form-input" placeholder="例如：春日日本之旅">
            </div>
            
            <div style="display: flex; gap: 16px; margin-bottom: 24px;">
                <div style="flex: 1;">
                    <div style="font-size: 16px; font-weight: 500; margin-bottom: 8px;">开始日期</div>
                    <div class="form-input">2025年3月15日</div>
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 16px; font-weight: 500; margin-bottom: 8px;">结束日期</div>
                    <div class="form-input">2025年3月20日</div>
                </div>
            </div>
            
            <div style="margin-bottom: 24px;">
                <div style="font-size: 16px; font-weight: 500; margin-bottom: 8px;">地点</div>
                <input type="text" class="form-input" placeholder="添加目的地">
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
                    <div class="tag">东京</div>
                    <div class="tag">大阪</div>
                </div>
            </div>
            
            <div style="margin-bottom: 24px;">
                <div style="font-size: 16px; font-weight: 500; margin-bottom: 8px;">封面照片</div>
                <div style="width: 100%; height: 150px; border-radius: 12px; border: 1px dashed #ddd; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #999; background: #f9f9f9;">
                    <iconify-icon icon="mdi:image-plus" style="font-size: 32px; margin-bottom: 8px;"></iconify-icon>
                    <div>点击上传封面图片</div>
                </div>
            </div>
            
            <div style="margin-top: 24px; font-weight: 700; font-size: 18px; padding-bottom: 8px; border-bottom: 1px solid #eee;">日程管理</div>
            
            <div style="padding: 12px; border: 1px solid #eee; border-radius: 8px; margin-top: 12px;">
                <div>3月15日 · 东京迪士尼</div>
                <div style="color: #999; font-size: 14px; margin-top: 4px;">上午09:00 - 下午09:00</div>
            </div>
            
            <div style="padding: 12px; border: 1px solid #eee; border-radius: 8px; margin-top: 12px;">
                <div>3月16日 · 浅草寺</div>
                <div style="color: #999; font-size: 14px; margin-top: 4px;">上午10:00 - 下午03:00</div>
            </div>
        </div>
        
        <div style="position: fixed; bottom: 80px; width: 375px; padding: 0 16px;">
            <button class="btn-primary w-full" style="position: relative; z-index: 20;">
                <iconify-icon icon="mdi:plus" style="margin-right: 8px;"></iconify-icon>
                添加日程
            </button>
        </div>
        
        <div class="footer">
            <div style="text-align: center; color: #999;">
                <iconify-icon icon="mdi:home" style="font-size: 24px;"></iconify-icon>
                <div style="font-size: 12px; margin-top: 4px;">行程</div>
            </div>
            <div style="text-align: center;">
                <iconify-icon icon="mdi:calendar" style="font-size: 24px; color: #165DFF;"></iconify-icon>
                <div style="font-size: 12px; color: #165DFF; margin-top: 4px;">日历</div>
            </div>
            <div style="text-align: center; color: #999;">
                <iconify-icon icon="mdi:cog" style="font-size: 24px;"></iconify-icon>
                <div style="font-size: 12px; margin-top: 4px;">设置</div>
            </div>
        </div>
    </div>

    <!-- 页面3: 单个计划详情 -->
    <div class="page">
        <div class="header">
            <iconify-icon icon="mdi:arrow-left" style="font-size: 24px;"></iconify-icon>
            <div style="font-size: 18px; font-weight: 700;">3月15日 · 东京迪士尼</div>
            <iconify-icon icon="mdi:pencil" style="font-size: 24px;"></iconify-icon>
        </div>
        
        <div class="content hide-scrollbar">
            <img id="3" src="https://modao.cc/ai/uploads/ai_pics/15/154330/aigp_1755675820.jpeg" alt="tokyo disneyland" style="width: 100%; height: 180px; border-radius: 12px; object-fit: cover;">
            
            <div style="margin-top: 24px;">
                <div style="font-size: 16px; margin-bottom: 8px; font-weight: 500;">日程时间</div>
                <div style="display: flex; gap: 16px;">
                    <div style="flex: 1; position: relative;">
                        <div class="form-input">2025年3月15日</div>
                    </div>
                    <div style="flex: 1; display: flex; gap: 8px;">
                        <div style="flex: 1;">
                            <div style="color: #999; font-size: 13px;">开始</div>
                            <div class="form-input">09:00</div>
                        </div>
                        <div style="flex: 1;">
                            <div style="color: #999; font-size: 13px;">结束</div>
                            <div class="form-input">21:00</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 24px;">
                <div style="font-size: 16px; margin-bottom: 8px; font-weight: 500;">出行方式</div>
                <div style="display: flex; gap: 12px; overflow-x: auto; padding-bottom: 8px; -webkit-overflow-scrolling: touch;">
                    <div style="flex: 0 0 auto; width: 60px; height: 60px; border-radius: 12px; background: #f0f7ff; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <iconify-icon icon="mdi:walk" style="font-size: 24px; color: #165DFF;"></iconify-icon>
                        <div style="font-size: 12px; margin-top: 4px;">步行</div>
                    </div>
                    <div style="flex: 0 0 auto; width: 60px; height: 60px; border-radius: 12px; background: #f0f7ff; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <iconify-icon icon="mdi:subway" style="font-size: 24px; color: #165DFF;"></iconify-icon>
                        <div style="font-size: 12px; margin-top: 4px;">地铁</div>
                    </div>
                    <div style="flex: 0 0 auto; width: 60px; height: 60px; border-radius: 12px; background: #165DFF; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <iconify-icon icon="mdi:car" style="font-size: 24px; color: white;"></iconify-icon>
                        <div style="font-size: 12px; margin-top: 4px; color: white;">自驾</div>
                    </div>
                    <div style="flex: 0 0 auto; width: 60px; height: 60px; border-radius: 12px; background: #f0f7ff; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <iconify-icon icon="mdi:taxi" style="font-size: 24px; color: #165DFF;"></iconify-icon>
                        <div style="font-size: 12px; margin-top: 4px;">打车</div>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 16px; font-weight: 500;">提醒通知</div>
                    <div class="toggle-switch active"></div>
                </div>
                <div style="margin-top: 12px; display: flex; gap: 8px;">
                    <div class="tag">30分钟前</div>
                    <div class="tag">1小时前</div>
                    <div class="tag" style="background: #165DFF; color: white;">2小时前</div>
                </div>
            </div>
            
            <div style="margin-top: 24px;">
                <div style="font-size: 16px; font-weight: 500; margin-bottom: 8px;">地点</div>
                <input type="text" class="form-input" value="日本东京迪士尼乐园">
                <div style="color: #999; font-size: 13px; margin-top: 8px;">
                    日本千葉県浦安市舞浜1-1
                </div>
            </div>
            
            <div style="margin-top: 24px;">
                <div style="font-size: 16px; font-weight: 500; margin-bottom: 8px;">备注</div>
                <textarea class="form-input" style="height: 100px;" placeholder="添加日程备注信息...">提前官网购票，避开周末节假日人流高峰。迪士尼海洋和乐园二选一。</textarea>
            </div>
        </div>
        
        <div class="footer">
            <div style="text-align: center; color: #999;">
                <iconify-icon icon="mdi:home" style="font-size: 24px;"></iconify-icon>
                <div style="font-size: 12px; margin-top: 4px;">行程</div>
            </div>
            <div style="text-align: center; color: #999;">
                <iconify-icon icon="mdi:calendar" style="font-size: 24px;"></iconify-icon>
                <div style="font-size: 12px; margin-top: 4px;">日历</div>
            </div>
            <div style="text-align: center;">
                <iconify-icon icon="mdi:cog" style="font-size: 24px; color: #165DFF;"></iconify-icon>
                <div style="font-size: 12px; color: #165DFF; margin-top: 4px;">设置</div>
            </div>
        </div>
    </div>

    <!-- 页面4: 日历视图 -->
    <div class="page">
        <div class="header">
            <div style="font-size: 18px; font-weight: 700;">2025年3月</div>
            <div style="display: flex; gap: 20px;">
                <div style="font-weight: 500; color: #165DFF;">月</div>
                <div style="color: #999;">周</div>
            </div>
        </div>
        
        <div class="content hide-scrollbar">
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 13px; color: #999; margin-bottom: 8px;">
                <div>日</div>
                <div>一</div>
                <div>二</div>
                <div>三</div>
                <div>四</div>
                <div>五</div>
                <div>六</div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px;">
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center; color: #ccc;">27</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center; color: #ccc;">28</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">1</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">2</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">3</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">4</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">5</div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-top: 4px;">
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">6</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">7</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">8</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">9</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">10</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">11</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">12</div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-top: 4px;">
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">
                    <div style="position: relative;">13</div>
                </div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">
                    <div style="position: relative;">14</div>
                </div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center; position: relative;">
                    <div style="position: absolute; top: 4px;">15</div>
                    <div style="position: absolute; bottom: 4px; width: 6px; height: 6px; background: #165DFF; border-radius: 50%;"></div>
                </div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center; position: relative;">
                    <div style="position: absolute; top: 4px;">16</div>
                    <div style="position: absolute; bottom: 4px; width: 6px; height: 6px; background: #165DFF; border-radius: 50%;"></div>
                </div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center; position: relative; background: #f0f7ff; border-radius: 50%;">
                    <div>17</div>
                </div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">18</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">19</div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-top: 4px;">
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">20</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">21</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">22</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">23</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">24</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">25</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">26</div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-top: 4px;">
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">27</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">28</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">29</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">30</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center;">31</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center; color: #ccc;">1</div>
                <div style="aspect-ratio: 1; display: flex; justify-content: center; align-items: center; color: #ccc;">2</div>
            </div>
            
            <div style="margin-top: 24px; font-weight: 700; font-size: 18px;">3月15日</div>
            
            <div class="card" style="margin-top: 12px;">
                <div style="display: flex; align-items: center;">
                    <div style="width: 50px; display: flex; flex-direction: column; align-items: center;">
                        <div style="font-size: 15px; font-weight: 500">09:00</div>
                        <div style="width: 2px; height: 40px; background: #165DFF; margin: 4px 0;"></div>
                        <div style="font-size: 15px;">21:00</div>
                    </div>
                    <div style="flex: 1; padding: 0 12px;">
                        <div style="font-weight: 500; font-size: 16px;">东京迪士尼乐园</div>
                        <div style="color: #999; margin-top: 4px;">游玩主题乐园和观看烟火表演</div>
                        <div style="display: flex; gap: 8px; margin-top: 8px;">
                            <div class="tag">已购票</div>
                            <div class="tag">交通：自驾</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card" style="margin-top: 12px;">
                <div style="display: flex; align-items: center;">
                    <div style="width: 50px; display: flex; flex-direction: column; align-items: center;">
                        <div style="font-size: 15px; font-weight: 500">18:30</div>
                        <div style="width: 2px; height: 40px; background: #eb2f96; margin: 4px 0;"></div>
                        <div style="font-size: 15px;">20:00</div>
                    </div>
                    <div style="flex: 1; padding: 0 12px;">
                        <div style="font-weight: 500; font-size: 16px;">迪士尼主题餐厅晚餐</div>
                        <div style="color: #999; margin-top: 4px;">需要提前预订的限定餐厅</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div style="text-align: center; color: #999;">
                <iconify-icon icon="mdi:home" style="font-size: 24px;"></iconify-icon>
                <div style="font-size: 12px; margin-top: 4px;">行程</div>
            </div>
            <div style="text-align: center;">
                <iconify-icon icon="mdi:calendar" style="font-size: 24px; color: #165DFF;"></iconify-icon>
                <div style="font-size: 12px; color: #165DFF; margin-top: 4px;">日历</div>
            </div>
            <div style="text-align: center; color: #999;">
                <iconify-icon icon="mdi:cog" style="font-size: 24px;"></iconify-icon>
                <div style="font-size: 12px; margin-top: 4px;">设置</div>
            </div>
        </div>
    </div>

    <script>
        // 初始化日历页面中的日期选择功能
        document.querySelectorAll('.page')[3].querySelectorAll('.calendar-day').forEach(day => {
            day.addEventListener('click', function() {
                document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
        
        // 切换开关状态
        document.querySelectorAll('.toggle-switch').forEach(toggle => {
            toggle.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        });
    </script>

</body></html>
