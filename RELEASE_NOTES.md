# ClassLens AI v0.3.0 / 课镜 AI

UI 与 AI 模型一轮大 refinement：深度接入 Kyant0 AndroidLiquidGlass 控件、课表排版重做、模型列表更新到主流性价比多模态。

## 下载

- `ClassLens-AI-v0.3.0.apk` — Android 8.0（API 26）及以上，arm64-v8a / armeabi-v7a / x86_64
- SHA-256：`4552273c330ef60d1654af67a27f4e706973a7c18394bd51ab8374c8ca3eed28`
- 大小：1.33 MB（1,397,359 字节）
- 由 ClassLens 发布密钥签名，后续版本可直接覆盖升级

## 新增与完善

### 液态玻璃全面接入

- 底部导航替换为 `LiquidBottomTabs` + `LiquidBottomTab`，保留 ClassLens 品牌色
- 主界面操作按钮、导入页动作按钮、设置页按钮全部使用 `LiquidButton`
- 外观页滑块替换为 `LiquidSlider`，开关替换为 `LiquidToggle`
- 全局玻璃模糊度在 `AppearanceSettings` 可调（`glassBlurDp`），并向下传递到底层 backdrop
- 圆角、留白、字体缩放统一调整，文字不再被截断

### 课表与导入体验

- 课程表布局重做：最窄列宽保护、小屏自动横向滚动、自适应字号 `AutoSizeText`
- 空课表状态显示「导入课表」「添加课程」两个入口，点击直接跳转
- 移除顶部 AppBar 的「+」按钮，减少误触
- AI 导入未配置时，灰色「去设置」文案本身可点击跳转；配置完成后按钮与其他入口一致显示「开始」

### AI provider 模型更新

- 默认模型切换为当前主流性价比多模态选项：OpenAI `gpt-4.1-mini`、Qwen `qwen-omni-latest`、Gemini / Claude / DeepSeek / GLM / 火山 / Kimi / MiniMax / xAI / Ollama 等
- 不支持视觉的模型改走纯文本高性价比路线（如 Mistral `mistral-medium-latest`）
- 视觉能力标记重新校准，选择模型时会提示是否需要 vision

### 稳定性

- 修复若干 import 与 Dp 运算编译错误
- 修复 `LiquidSlider`/`LiquidToggle` 导入与 `FontWeight` 缺失引用

---

# ClassLens AI v0.2.0 / 课镜 AI

功能大完善：完整周课表、学期设置、课程编辑、外观与液态玻璃、教务系统导入全适配。

## 下载

- `ClassLens-AI-v0.2.0.apk` — Android 8.0（API 26）及以上，arm64-v8a / armeabi-v7a / x86_64
- SHA-256：`678b1a5ee9cd76eb005390eebfd2885fdf9fad67cfc1c9a47225b45e1db0cd9a`
- 大小：1.30 MB（1,364,591 字节）
- 由 ClassLens 发布密钥签名，后续版本可直接覆盖升级

> 首次安装若提示「未知来源应用」，请在系统设置中授权该来源一次。

## 新增与完善

### 课表与周视图

- 全新周课表视图：时间轴、星期列、当前时间红线、周次导航
- 课程卡片显示教师、教室、单双周角标（自动识别单双周 / 自定义周集合）
- 支持显示周末、非本周课程、节次时间
- 学期设置：开学日期、总周数、每日最大节数、每节起止时间
- 自动计算当前周，周视图可一键回到本周
- 课程编辑器底部面板：名称、教师、教室、星期、起止节、周类型、周范围、颜色、学分、考试信息、分组等

### 外观与液态玻璃

- 照搬 QingHeLedger（小猪账本）液态玻璃实现：折射、色散、磨砂
- 可自定义背景图片：支持裁剪、保留原始比例、空缺区域自动填白（深色模式填黑）
- 背景模糊度、遮罩浓度、玻璃磨砂度可调
- 课程格不透明度、文字大小可调
- 多套配色方案
- Lens 模式开关：开启后仅对非导航栏区域应用模糊折射

### 教务系统导入

- 新增「教务系统导入」弹窗，支持 WebView 自动抓取与粘贴 HTML 两种模式
- 内置常见高校教务系统识别：正方新/老、强智、URP、树维/eams、青果、金智/今日校园、超星、CRP 等
- 自动识别失败时回退到通用 HTML 表格解析
- 账号密码仅在 WebView 内提交，应用不保存

### 传统文件导入

- JSON、CSV、TSV
- XLSX（Office Open XML，标准 ZIP/XML 解析）
- DOCX（同上）
- ICS（支持折行、参数化 `DTSTART`、UTC 与本地日期、`RRULE` `BYDAY`）
- HTML 表格与纯文本

不支持的二进制格式会被明确拒绝并提示原因，不会伪装成导入成功。

### AI 导入（BYOK）

- 把课表截图、PDF 或教务系统导出的混乱文件交给模型解析
- 支持 OpenAI 兼容接口、Anthropic Messages、Gemini 多模态
- 内置 provider：OpenAI、DeepSeek、GLM、火山/豆包、Kimi、Claude、Gemini、Qwen、MiniMax、xAI、Mistral、Ollama、自定义 OpenAI-compatible
- API Key 保存在 Android Keystore + AES/GCM 中；应用不含任何内置 Key，Key 不写入日志、备份或本仓库
- 需要解析图片或 PDF 时请使用**支持视觉（vision）的模型**，否则应用会提示你切换模型

### 安全边界

AI 只能调用只读工具；任何写入、修改、清空课表的操作都只会生成预览（Preview），必须由你在导入确认界面手动确认后才会写入本地数据。未确认时 `applyConfirmed` 不写库。

### 应用图标

- 新增自适应图标：品牌青 #0B7A66 背景 + 课表网格与镜片前景

## 隐私

- 课表数据与 API Key 都保存在本机
- 只有在你主动发起 AI 导入时才会向所选 provider 发送请求
- 应用不内置任何服务端，不上传你的课表
- 详见仓库中的 `PRIVACY.md`

## 界面

采用液态玻璃（liquid glass）视觉风格，底层为 vendored 的 Kyant0 [AndroidLiquidGlass](https://github.com/Kyant0/AndroidLiquidGlass) `com.kyant.backdrop` 引擎；Android 8–11 提供降级渲染路径。

## 许可证

- ClassLens AI 本体：Apache-2.0，版权归 ClassLens AI / Kanghe Lyu
- 第三方声明见 `NOTICE`

---

# ClassLens AI v0.1.0 / 课镜 AI

首个公开版本。本地优先的课程表应用：课表存在你自己的设备上，AI 导入使用你自己的 API Key（BYOK）。

## 下载

- `ClassLens-AI-v0.1.0.apk` — Android 8.0（API 26）及以上
- SHA-256：`62512bea74f6d92ef19ce8373789b9d8b79ae79e72ecfbbd415391897d3e00dc`
- 大小：1.18 MB（1,241,439 字节）
