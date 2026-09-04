# ClassLens AI v0.3.7 / 课镜 AI

本轮集中修复用户反馈的交互问题，并重做教务导入解析层。

## 下载

- `ClassLens-AI-v0.3.7.apk` — Android 8.0（API 26）及以上
- SHA-256：`539123fe66f594c17bf1ebef5787d4fe800ec00c3f3556bb07b089dfd68fbd22`
- 大小：1.36 MB（1,430,127 字节）
- 由 ClassLens 发布密钥签名，可直接覆盖升级

## 交互修复

### 1. 滑块现在真正能拖动了（LiquidSlider）

手柄此前走的是 `DampedDragAnimation.modifier`（其内部 `inspectDragGestures` 在部分机型上不触发拖拽事件），导致滑块无法拖动。改为与轨道一致的 Compose 标准 `detectHorizontalDragGestures`，拖动与点按跳转均恢复正常。

### 2. 去除按钮 / 滑块手柄的浅黑阴影

手柄与开关原本有一圈 `Black @ 0.05, 4dp` 的阴影，在容器边缘被裁剪时会露出一截黑边，显得脏。已将扩散收紧为 `2dp` 且透明度归零，截断面不再有黑边。

### 3. 暗色模式课程卡片文字改为对比色

课程卡片底色按课程色填充（暗色下多为浅色），原文字用 `onSurface`（暗色下为浅色）导致浅字压浅底、几乎不可见。现按底色 `luminance` 自动取深/浅对比文字，暗色下为浅色，保证可读。

### 4. 新增亮色 / 暗色 / 跟随系统 主题切换

设置页新增「主题模式」三选项（跟随系统 / 亮色 / 暗色），选择持久化，全局 `ClassLensTheme(darkTheme=...)` 即时生效。

## 教务导入重做（解析层）

参考 Dawn-Course / TodoSchedule 等开源课表项目的「WebView 内登录态抓取已渲染 HTML → 表格解析」方案，修正三处致命问题：

- **解码 `\uXXXX` unicode 转义**：`evaluateJavascript` 默认把 `< > "` 编码成 `\u003C \u003E \u0022`，旧代码只解 `\" \n \r \t`，导致解析器看到的仍是 `\u003cdiv\u003e`、匹配不到任何标签、列表永远为空。现已先解码全部 `\uXXXX`。
- **正方 HTML 改走通用表格解析器**：正方「个人课表」页是 HTML 表格，旧路由却把它送给只认 JSON 的 `ZhengFangParser`，必然返回空。`ZhengFangParser` 仅保留给 JSON API 分支。
- **通用表格解析器支持 rowspan / colspan 展开**：多节次课程常以 `<td rowspan="2">` 跨行，旧解析器忽略后整表列错位。新版按网格展开，并优先识别 `id="kbtable"`、按 `<div>`（正方 `kbcontent`）或 `<br>` 拆分课程块，启发式提取课程名 / 教师 / 地点 / 周次（含单双周）。

覆盖厂商：正方新/旧、强智、URP、青果、金智、CRP、eams 树维等常见表格教务。

---

# ClassLens AI v0.3.6 / 课镜 AI

v0.3.5 发布后的自查补丁（针对交互逻辑做了一次完整 code-review，无功能性回退）：

## 修复

### 1. 教务导入 WebView 资源泄漏

`EduImportDialog` 内的 `WebView` 此前在对话框关闭时未被销毁，反复打开导入会累积 WebView 实例，长期可能拖慢或崩溃。改用 `DisposableEffect(Unit)` 在对话框离开组合时 `destroy()` 并清空引用，避免泄漏。

### 2. 清理冗余变量

移除「今日」页中未使用的 `tickNow` 临时变量。

> 注：v0.3.5 的全部交互修复与新增功能（滑块/开关/图库背景/教务导入/~120 校/自定义颜色/隐藏课程/搜索/ICS/备份/今日统计）在本版保持不变。

## 下载

- `ClassLens-AI-v0.3.6.apk` — Android 8.0（API 26）及以上
- SHA-256：`b9ad11c793ed21042e4ffe215cfc66b0368357964e28fbca5ce277d6a4338ce2`
- 大小：1.35 MB（1,413,743 字节）
- 由 ClassLens 发布密钥签名，可直接覆盖升级

---

# ClassLens AI v0.3.5 / 课镜 AI

本轮按用户反馈集中修复交互问题，并补齐一批实用功能。主要改动：

## 下载

- `ClassLens-AI-v0.3.5.apk` — Android 8.0（API 26）及以上，arm64-v8a / armeabi-v7a / x86_64
- SHA-256：`dbb137d97b185ff16ecf7635090c58640da0ac34ce53154a72027ddc47e0dbd0`
- 大小：1.35 MB（1,413,743 字节）
- 由 ClassLens 发布密钥签名，可直接覆盖升级

## 交互修复

### 1. 滑块现在能拖动了（LiquidSlider）

整条轨道的拖拽手势之前因 `dragAmount` 取了不存在的 `.x` 字段而完全失效。已按 Kyant0 液态玻璃参考实现修正：`detectHorizontalDragGestures` 的回调给出的是 `Float` 位移量，直接累加计算进度，按下时 `press()`、松手 `release()`，滑块实时跟随手指。

### 2. 开关点一下就能切换（LiquidToggle）

开关原本只能靠拖拽，体验与记账软件（青禾记账）不一致。已改为：整个控件 `clickable` + 拖拽手势双通道——点一下即 `onSelect(!selected)` 切换；拖拽则平滑跟手，松手归位到目标态，不再要求必须拖动。

### 3. 背景选择直接进图库

「选择图片」按钮原逻辑会落到文件夹浏览器。现统一用 `ActivityResultContracts.GetContent("image/*")`：Android 13+ 直接拉起系统照片选择器（图库），选图后复制到应用私有目录，不再经过文件夹。

### 4. 教务导入重写（扒开源做法）

教务处导入此前完全用不了。参照开源课程表项目的 WebView 方案重写 `EduImportDialog`：

- 学校选择框支持按名称/别名搜索，选中后自动填好 URL 与解析器类型并加载页面；
- 「前往」按钮在 WebView 内跳转登录；
- 「抓取当前页」用 `evaluateJavascript("document.documentElement.outerHTML")` 取出真实渲染后的页面 HTML，保留登录 Cookie，交给对应解析器（正方新/旧、强智、URP、青果、金智、超星、CRP 等）解析；
- WebView 不可用时回退到 `EduFetcher` 直接请求。

### 5. 内置约 120 所高校

新增 `SchoolList`，整合多个开源课程表项目覆盖的院校：正方新（约 37）、正方旧（约 16）、强智（约 18）、URP（约 8）、EAMS（约 7）、青果（约 8）、金智（约 8）、超星（约 4）、CRP（约 3）。导入时直接搜索选择，无需手动抄 URL。

## 新增实用功能

### 6. 课程自定义颜色

课程编辑页新增 12 色色板与「用配色」开关；自定义颜色优先级高于自动配色。`Course.customColor` 已加入序列化，覆盖升级不丢。

### 7. 隐藏课程

课程可标记为「隐藏」，周视图 / 今日 / 主页概览均自动过滤，方便保留数据但不显示。

### 8. 课表内搜索

周视图顶部新增搜索框（标题/教师/教室），超长内容横向可滚动查看（URL 等单行字段已是 `singleLine` 横向滚动，超出部分可滑动查看，不再被截断看不见）。

### 9. 导出到系统日历（ICS）

「数据」面板新增「导出到系统日历」，按学期开学日期、每节起止时间、周范围（含单/双周）生成 `.ics`，可在系统日历一键导入，跨 App 提醒。

### 10. 备份与恢复

新增「从备份恢复」：支持把此前导出的 JSON 课表备份整体还原（替换当前课表全部课程）。

### 11. 今日统计 + 下一节课倒计时

今日页新增统计块（课程数 / 总学分 / 周次范围），并实时显示「下一节课」卡片，含距开课的分钟倒计时（每 30 秒刷新）。

---

# ClassLens AI v0.3.4 / 课镜 AI

本轮集中修复用户反馈的多项问题：AI 模型名称未更新、底部液态滑块不跟随选择、课表只能导入一个、AI 写入会误清空未上传字段、模型测试结果配色不对。

## 下载

- `ClassLens-AI-v0.3.4.apk` — Android 8.0（API 26）及以上，arm64-v8a / armeabi-v7a / x86_64
- SHA-256：`7957c2b8c8a25dd38f57ce77aa67717358bcfbcaf2c64f6841da167d5f455090`
- 大小：1.33 MB（1,397,359 字节）
- 由 ClassLens 发布密钥签名，可直接覆盖升级

## 修复

### 1. AI 模型名称已更新到 2026 当前在售 ID

`AiModels.kt` 的 provider 预设全部刷新为各厂商当前主推模型（此前停留在旧名，用户反馈「还是老模型」）：

- OpenAI `gpt-4.1-mini` → `gpt-5-mini`
- DeepSeek `deepseek-chat` → `deepseek-v4-flash`
- 智谱 GLM `GLM-4.5` → `glm-5.2`
- 火山 `doubao-seed-1-6-vision-250815` → `doubao-seed-2.0-pro-260215`
- Kimi `kimi-k2-0905-preview` → `kimi-k2.5`
- Claude `claude-sonnet-4-20250514` → `claude-sonnet-4-6`
- Gemini `gemini-2.5-flash` → `gemini-3.5-flash`
- Qwen `qwen-omni-latest` → `qwen3-max`
- MiniMax `MiniMax-M1` → `MiniMax-M2.5`
- xAI `grok-4` → `grok-4.3`
- Mistral `mistral-medium-latest` → `mistral-medium-3.1`

Ollama（`qwen3:8b`）与自定义 OpenAI 兼容接口保持不变。

### 2. 底部液态滑块跟随选项

`LiquidBottomTabs` 的底部 indicator 之前卡死在初始 tab，点击切换不跟随。根因是每次重组都重建了承载当前 index 的 `State` 对象，导致下游 `LaunchedEffect(snapshotFlow)` 一直监听旧的 `State`，点击永不重新触发动画。改为用一个稳定 `State` 承载整数选中值，并在 `selectedIndex` 变化时通过 `LaunchedEffect` 同步，indicator 现在会滑动到所选 tab。

### 3. 支持导入多个课表 + 全局课表选择器

- 新增 `Schedule` 数据模型（id / name / courses / term），SharedPreferences 以 JSON 数组存储全部课表，并单独记录当前激活课表 id。
- 主界面顶部 AppBar 新增「课表」入口（`LiquidButton` + 分支图标），打开 `ScheduleManagerSheet`：
  - 列出全部课表，单选 `RadioButton` 切换当前激活课表（影响全局数据、设置、AI 范围）
  - 每行可重命名、可删除（激活中的课表不允许删除，至少保留 1 个）
  - 「新建课表」一键创建
- `ScheduleRepository` 重写：所有课程读写、学期设置、冲突/搜索都作用于「当前激活课表」。

### 4. 课表相关设置跟随对应课表

学期设置（开学日期、总周数、每日最大节数、每节起止时间、显示周末等）现在存入各自课表对象，切换课表时设置随之切换，互不串台。

### 5. 暴露全部接口给 AI 助手

`ScheduleToolRegistry` 已覆盖：读取/写入课程字段（名称、教师、教室、星期、起止节、周类型、周范围、颜色、学分、考试信息、分组）、学期设置（含每节课起止时间 `sectionTimes`）、冲突与搜索。AI 导入可写的范围与用户手动编辑完全一致。

### 6. AI 只改对应课表的设置

`AiClient.buildMessages` 在系统提示里明确告知当前激活课表名，并要求「读/写只影响该课表、修改课程必须带课程 id」；repository 层所有写入天然只作用于激活课表，从机制上保证不会跨课表误改。

### 7. 关键字段保护（写死，不可绕过）

用户上传内容里**没有**的字段，AI 一律不得清空或改成默认值。工具层用 `args.has("字段名")` 逐字段判断：只有上传里出现的字段才用新值覆盖，其余字段原样保留（合并而非整体替换）。学期设置同理用 `mergeTerm` 合并，而非从 JSON 整体重建（整体重建会丢字段）。系统提示也强制要求「只填要改的字段，绝不清空/重置其他字段」。

### 8. 失败红、成功绿

设置页模型测试等结果文案：含「失败 / 错误 / 连接失败」判为失败，用 `MaterialTheme.colorScheme.error`（红）；其余成功用绿色（浅色模式深绿 `0xFF1E8E4E`，深色模式亮绿 `0xFF41C98A`）。

---

# ClassLens AI v0.3.3 / 课镜 AI

修复周课表背景里几块突兀的硬边色块（绿/金/粉/蓝），并整理周次导航栏的拥挤布局。

## 下载

- `ClassLens-AI-v0.3.3.apk` — Android 8.0（API 26）及以上，arm64-v8a / armeabi-v7a / x86_64
- SHA-256：`7f794a7883e6eda0f4a00490d50c641dcb82f193b431b64a422b056fd3ed8e85`
- 大小：1.33 MB（1,397,359 字节）
- 由 ClassLens 发布密钥签名，可直接覆盖升级

## 修复

### 环境背景去硬边

- `LiquidGlass.drawAmbient()` 移除了原本用于「清晰折射边界」的 4 个 `drawCircle(实心 alpha)` 硬边圆
- 改用三段渐变的 `Brush.radialGradient` 软光斑（中心 → 中段过渡 → 完全透明），玻璃面折射仍有色彩深度，但页面本身不再出现突兀的色块
- 柔光斑数量从 8 个收敛到 5 个，整体观感更克制

### 周次导航

- 「回到本周」按钮仅在 `displayedWeek != currentWeek` 时显示，已是本周时不再出现
- 周次标题与日期 `AutoSizeText` 显式声明 `maxLines = 1`，避免在窄列中被挤成多行
- 行内 `IconButton` 与 LiquidButton 的间距收紧，导航栏整体更紧凑

---

# ClassLens AI v0.3.2 / 课镜 AI

清理所有剩余 Material `Button` / `TextButton`，全部替换为 `LiquidButton`；修复编译期 deprecation 警告。

## 下载

- `ClassLens-AI-v0.3.2.apk` — Android 8.0（API 26）及以上，arm64-v8a / armeabi-v7a / x86_64
- SHA-256：`e30fa737b1d85348ada2cd66d8f6efb888d8a3e02aac576b390c797db285d869`
- 大小：1.33 MB（1,397,359 字节）
- 由 ClassLens 发布密钥签名，后续版本可直接覆盖升级

## 新增与完善

### 全面 Kyant0 按钮化

- `MainActivity` 中所有 AlertDialog 的确认/取消/删除/清空/编辑/保存/测试按钮全部改为 `LiquidButton`
- `AppearanceSheet`：「恢复默认」「配色标签」改为 `LiquidButton`
- `WeekScheduleScreen`：「回到本周」改为 `LiquidButton`
- 删除/清空等危险操作用 `tint = MaterialTheme.colorScheme.error` 标示
- 测试/次要操作用 `tint = MaterialTheme.colorScheme.secondary` 标示

### 编译清理

- 修复 `Modifier.menuAnchor()` deprecation 警告，改用带 `MenuAnchorType` 的重载
- 修复 `Icons.Rounded.MenuBook` deprecation 警告，改用 `Icons.AutoMirrored.Rounded.MenuBook`
- 移除已弃用的 `Button`、`ButtonDefaults`、`TextButton` 导入

---

# ClassLens AI v0.3.1 / 课镜 AI

补齐剩余 Kyant0 组件接入，并让全局玻璃模糊度真正联动所有液态玻璃控件。

## 下载

- `ClassLens-AI-v0.3.1.apk` — Android 8.0（API 26）及以上，arm64-v8a / armeabi-v7a / x86_64
- SHA-256：`bc7cb86b7bf5a1b41bbda46873f51101d014285721a01e05caecbf4511f92ce4`
- 大小：1.33 MB（1,397,359 字节）
- 由 ClassLens 发布密钥签名，后续版本可直接覆盖升级

## 新增与完善

### 全局玻璃模糊度联动

- `LiquidButton`、`LiquidSlider`、`LiquidToggle`、`LiquidBottomTabs` 全部读取 `AppearanceSettings.glassBlurDp`
- 玻璃磨砂、透镜折射高度/强度随滑块实时变化，不再是硬编码常量
- `GlassPanel` / `classLensGlass` 原本已接入，现在整套 liquid glass 统一

### 剩余界面 Kyant0 化

- 课程编辑器（`CourseEditorSheet`）：取消/保存按钮改为 `LiquidButton`
- 学期设置（`TermSettingsSheet`）：取消/保存按钮改为 `LiquidButton`；「显示周末」`Switch` 改为 `LiquidToggle`
- 教务系统导入（`EduImportDialog`）：抓取/解析/关闭按钮改为 `LiquidButton`

---

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
