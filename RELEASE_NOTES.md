# ClassLens AI v0.1.0 / 课镜 AI

首个公开版本。本地优先的课程表应用：课表存在你自己的设备上，AI 导入使用你自己的 API Key（BYOK）。

## 下载

- `ClassLens-AI-v0.1.0.apk` — Android 8.0（API 26）及以上，arm64-v8a / armeabi-v7a / x86_64
- SHA-256：`62512bea74f6d92ef19ce8373789b9d8b79ae79e72ecfbbd415391897d3e00dc`
- 大小：1.18 MB（1,241,439 字节）
- 由 ClassLens 发布密钥签名，后续版本可直接覆盖升级

> 首次安装若提示「未知来源应用」，请在系统设置中授权该来源一次。

## 功能

### 课表

- 今日视图与周课表视图
- 手动新增 / 编辑 / 删除课程，删除带确认
- 学期设置与课程详情
- JSON 课表导出，可自行备份
- 清空课表需二次确认

### 传统文件导入

无需联网、无需 API Key，直接解析本地文件：

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

### 教务系统

内置 WebView 入口，可直接登录教务系统查看或导出课表。页面改版、验证码、WebVPN 等限制可能导致无法自动抓取，此时请改用文件导入。

## 隐私

- 课表数据与 API Key 都保存在本机
- 只有在你主动发起 AI 导入时才会向所选 provider 发送请求
- 应用不内置任何服务端，不上传你的课表
- 详见仓库中的 `PRIVACY.md`

## 界面

采用液态玻璃（liquid glass）视觉风格，底层为 vendored 的 Kyant0 [AndroidLiquidGlass](https://github.com/Kyant0/AndroidLiquidGlass) `com.kyant.backdrop` 引擎；Android 8–11 提供降级渲染路径。

## 许可证

- ClassLens AI 本体：Apache-2.0，版权归 ClassLens AI / Kanghe Lyu
- 第三方声明见 `NOTICE` 与 `THIRD_PARTY_LICENSES.md`
