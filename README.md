#SALIR
闲来写个女朋友用的一个出行app，以下是原型图<br>
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
