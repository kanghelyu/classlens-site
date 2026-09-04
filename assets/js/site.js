(function () {
  "use strict";

  // Mobile nav
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.getElementById("site-nav");

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll reveal
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".site-nav a[href^='#']");

  function setActiveNav() {
    const scrollPos = window.scrollY + 120;
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("is-active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("is-active");
      }
    });
  }

  // Back-to-top visibility
  const backToTop = document.querySelector(".back-to-top");
  function handleScroll() {
    setActiveNav();
    if (backToTop) {
      backToTop.classList.toggle("is-visible", window.scrollY > 500);
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Subtle phone tilt on desktop
  const phoneFrame = document.querySelector(".phone-frame");
  const heroVisual = document.querySelector(".hero-visual");
  if (phoneFrame && heroVisual && window.matchMedia("(pointer: fine)").matches) {
    heroVisual.addEventListener("mousemove", (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      phoneFrame.style.transform = `rotateY(${x * -12}deg) rotateX(${y * 8}deg)`;
    });

    heroVisual.addEventListener("mouseleave", () => {
      phoneFrame.style.transform = "";
    });
  }

  /* ---- Bilingual (中文 / English) language toggle ---- */
  const I18N = {
    en: {
      docTitle: "ClassLens AI | Android Release",
      metaDesc: "ClassLens AI Android release: liquid-glass course schedule, AI import, and local-first privacy.",
      noticeChannel: "ClassLens AI Android release channel",
      noticeManifest: "View manifest",
      brandName: "ClassLens AI",
      navDownload: "Download",
      features: "Features",
      navProviders: "Providers",
      privacy: "Privacy",
      licenses: "Licenses",
      heroKicker: "AI-Powered Course Schedule",
      heroTitle: "Your classes, seen clearly.",
      heroSummary: "ClassLens AI combines a local-first timetable with optional AI-assisted import. Bring in screenshots, PDFs, or existing files, review the preview, and keep your schedule on your device.",
      heroDownload: "Download APK",
      heroExplore: "Explore features",
      briefLabel: "CURRENT RELEASE",
      labelPublished: "Published",
      labelMinAndroid: "Minimum Android",
      featTitle: "Built around your actual workflow.",
      featDesc: "The core idea is simple: your timetable lives locally, and AI is only there when you explicitly ask for help importing or parsing material.",
      feat1Title: "Weekly schedule, at a glance",
      feat1Desc: "Time axis, weekday columns, current-time indicator, and adaptive layout that scrolls gracefully on small screens.",
      feat2Title: "AI import, BYOK",
      feat2Desc: "Send screenshots or documents to a model you configure. No built-in key, no silent uploads — you choose the provider.",
      feat3Title: "Liquid-glass appearance",
      feat3Desc: "Adjust blur, opacity, palette, and background. Deeply integrated with Kyant0 AndroidLiquidGlass components.",
      dlKicker: "Release manifest",
      dlTitle: "Get the Android package.",
      dlDesc: "All release values come from a single local manifest. Verify the SHA-256 before installing any APK obtained outside an app store.",
      dlApkLabel: "ANDROID APK",
      labelSize: "Package size",
      labelSha: "SHA-256",
      dlDownload: "Download APK",
      dlNotes: "Read release notes",
      impKicker: "Import guidance",
      impTitle: "Start with the original material.",
      impDesc: "Keep a copy of the source document and use traditional import when you need to bring existing course files into your study workflow.",
      imp1Title: "Traditional import",
      imp1Desc: "Select your existing material from device storage, then review the imported result against the source before relying on it for study or submission.",
      imp2Title: "Visual-model warning",
      imp2Desc: "Vision-capable models can miss small text, handwriting, tables, equation layout, rotations, and context across pages. Treat visual output as assistance, not an authoritative reading.",
      imp3Title: "Share deliberately",
      imp3Desc: "Only submit material you are allowed to share. Remove sensitive personal information before sending text, pages, or images to a remote AI provider.",
      provKicker: "Provider matrix",
      provTitle: "Know which route handles your material.",
      provDesc: "Availability depends on the provider and model you configure. The matrix distinguishes local handling from requests that may send selected content to a remote provider.",
      tableCaption: "ClassLens AI data routes",
      thRoute: "Route",
      thProviderReq: "Provider requirement",
      thLeaves: "What may leave the device",
      thLimitation: "Important limitation",
      rowTraditional: "Traditional import",
      valNone: "None",
      cellTrad1: "No AI provider request is required to select source material.",
      cellTrad2: "Imported content still needs your review for completeness and formatting.",
      rowTextAi: "Text-capable AI",
      cellText1: "A provider and text-capable model selected by you",
      cellText2: "The text or excerpts you explicitly submit for analysis.",
      cellText3: "Generated answers can be incomplete, outdated, or incorrect.",
      rowVisionAi: "Vision-capable AI",
      cellVision1: "A provider and vision-capable model selected by you",
      cellVision2: "The pages, images, or visual excerpts you explicitly submit.",
      cellVision3: "Visual interpretation is probabilistic; verify it against the image.",
      rowOffline: "Offline review",
      cellOff1: "No provider transfer is involved.",
      cellOff2: "AI-generated analysis is unavailable without a configured provider route.",
      privTitle: "A release page without hidden credentials.",
      privDesc: "This static site contains no API keys, does not ask for provider credentials, and does not send your class material anywhere.",
      priv1Title: "Provider boundaries",
      priv1Desc: "When you choose to submit content through a configured AI route, that provider's terms, retention practices, and privacy policy govern the submitted content.",
      priv2Title: "Release-page scope",
      priv2Desc: "The release page is informational. It does not collect uploads, account data, or provider keys, and it has no embedded analytics or third-party media.",
      priv3Title: "Your review",
      priv3Desc: "Check the APK source and SHA-256 before installation, and only use materials you have the right to process.",
      licTitle: "License information belongs with the build.",
      licDesc: "The final APK includes its applicable ClassLens license and third-party notices. Verify the metadata below against the published build.",
      licAppTitle: "ClassLens application license",
      licThirdTitle: "Third-party notices",
      licThirdDesc: "Published with the final build and source distribution, where applicable.",
      licModelTitle: "Model and provider terms",
      licModelDesc: "Reviewed separately under the terms of the provider and model you choose.",
      footerDesc: "Static Android release information",
      importHintTag: "Import timetable",
      importHintDesc: '① In <b>Edu/Admin System Import</b>, <b>select your school</b> — it auto-opens that school’s login page → ② After logging in, open <b>“This Semester / My Schedule”</b> → ③ Stay on that page and tap <b>“Capture current page &amp; import”</b>. <span class="muted">Your account password is submitted only inside the WebView and is never saved by the app.</span>',
      importHintAria: "How to import your timetable correctly"
    },
    zh: {
      docTitle: "课镜 AI | Android 发布",
      metaDesc: "课镜 AI Android 发布：液态玻璃课表、AI 导入，以及本地优先的隐私保护。",
      noticeChannel: "课镜 AI Android 发布渠道",
      noticeManifest: "查看发布清单",
      brandName: "课镜 AI",
      navDownload: "下载",
      features: "功能",
      navProviders: "服务商",
      privacy: "隐私",
      licenses: "许可",
      heroKicker: "AI 智能课表",
      heroTitle: "让你的课程，一目了然。",
      heroSummary: "课镜 AI 采用本地优先的课表，并支持可选的 AI 辅助导入。你可以导入截图、PDF 或已有文件，核对预览后，让课表始终留在你的设备上。",
      heroDownload: "下载 APK",
      heroExplore: "了解功能",
      briefLabel: "当前版本",
      labelPublished: "发布日期",
      labelMinAndroid: "最低 Android 版本",
      featTitle: "围绕你真实的使用流程打造。",
      featDesc: "核心思路很简单：你的课表保存在本地，AI 只在你明确要求导入或解析资料时才介入。",
      feat1Title: "周课表，一目了然",
      feat1Desc: "时间轴、星期列、当前时间指示线，以及在小屏幕上也能流畅滚动的自适应布局。",
      feat2Title: "AI 导入，自带密钥（BYOK）",
      feat2Desc: "将截图或文档发送给你自己配置的模型。没有内置密钥，也不会静默上传——由你来选择服务商。",
      feat3Title: "液态玻璃外观",
      feat3Desc: "调节模糊、透明度、配色与背景。深度集成 Kyant0 AndroidLiquidGlass 组件。",
      dlKicker: "发布清单",
      dlTitle: "获取 Android 安装包。",
      dlDesc: "所有发布信息都来自一份本地清单。安装任何应用商店之外的 APK 前，请先核对 SHA-256。",
      dlApkLabel: "ANDROID APK",
      labelSize: "安装包大小",
      labelSha: "SHA-256",
      dlDownload: "下载 APK",
      dlNotes: "查看发布说明",
      impKicker: "导入指引",
      impTitle: "从原始资料开始。",
      impDesc: "保留一份源文件副本，并在需要将已有课程文件纳入学习流程时使用传统导入。",
      imp1Title: "传统导入",
      imp1Desc: "从设备存储中选择已有资料，在用于学习或提交前，对照源文件核对导入结果。",
      imp2Title: "视觉模型提醒",
      imp2Desc: "具备视觉能力的模型可能遗漏小字、手写、表格、公式排版、旋转角度以及跨页上下文。请将视觉输出视为辅助，而非权威解读。",
      imp3Title: "谨慎分享",
      imp3Desc: "只提交你有权分享的资料。在向远程 AI 服务商发送文字、页面或图片前，请先移除敏感个人信息。",
      provKicker: "服务商矩阵",
      provTitle: "了解哪条路径处理你的资料。",
      provDesc: "可用性取决于你所配置的服务商与模型。该矩阵区分本地处理方式，以及可能将所选内容发送至远程服务商的请求。",
      tableCaption: "课镜 AI 数据流转路径",
      thRoute: "路径",
      thProviderReq: "服务商要求",
      thLeaves: "可能离开设备的内容",
      thLimitation: "重要限制",
      rowTraditional: "传统导入",
      valNone: "无",
      cellTrad1: "选择源资料无需向 AI 服务商发起请求。",
      cellTrad2: "导入的内容仍需你核对完整性与格式。",
      rowTextAi: "文本型 AI",
      cellText1: "由你选择的服务商与具备文本能力的模型",
      cellText2: "你明确提交用于分析的文本或片段。",
      cellText3: "生成的回答可能不完整、过时或不准确。",
      rowVisionAi: "视觉型 AI",
      cellVision1: "由你选择的服务商与具备视觉能力的模型",
      cellVision2: "你明确提交的页面、图片或视觉片段。",
      cellVision3: "视觉解读具有概率性，请对照原图核实。",
      rowOffline: "离线核对",
      cellOff1: "不涉及向服务商传输数据。",
      cellOff2: "未配置服务商路径时，无法使用 AI 生成的分析。",
      privTitle: "没有隐藏凭据的发布页。",
      privDesc: "这个静态站点不含任何 API 密钥，不会索取服务商凭据，也不会将你的课程资料发送到任何地方。",
      priv1Title: "服务商边界",
      priv1Desc: "当你选择通过已配置的 AI 路径提交内容时，该服务商的条款、留存策略与隐私政策将约束所提交的内容。",
      priv2Title: "发布页范围",
      priv2Desc: "发布页仅用于展示信息。它不会收集上传内容、账户数据或服务商密钥，也不包含任何内嵌的分析或第三方媒体。",
      priv3Title: "你的核对",
      priv3Desc: "安装前请核对 APK 来源与 SHA-256，并且只使用你有权处理的资料。",
      licTitle: "许可信息随构建版本提供。",
      licDesc: "最终 APK 包含适用的 ClassLens 许可与第三方声明。请对照已发布的构建核对下方元数据。",
      licAppTitle: "ClassLens 应用许可",
      licThirdTitle: "第三方声明",
      licThirdDesc: "随最终构建与源码分发一并提供（如适用）。",
      licModelTitle: "模型与服务商条款",
      licModelDesc: "根据你选择的服务商与模型条款另行审阅。",
      footerDesc: "Android 发布信息（静态站点）",
      importHintTag: "导入课表",
      importHintDesc: '① 在「教务系统导入」里<b>选学校</b>，自动跳转该校登录页 → ② 登录后进入<b>「本学期课表 / 个人课表」</b> → ③ 停留在该页面，点<b>「抓取当前页并导入」</b>。<span class="muted">账号密码仅在 WebView 内提交，不会保存到应用。</span>',
      importHintAria: "如何正确导入课表"
    }
  };

  const LANG_KEY = "classlens-lang";

  function getInitialLang() {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "zh" || saved === "en") return saved;
    return (navigator.language || "en").toLowerCase().startsWith("zh") ? "zh" : "en";
  }

  function setLang(lang) {
    const dict = I18N[lang];
    if (!dict) return;

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.innerHTML = dict[key];
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (dict[key] != null) el.setAttribute("aria-label", dict[key]);
    });

    if (dict.docTitle) document.title = dict.docTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && dict.metaDesc) meta.setAttribute("content", dict.metaDesc);

    const toggle = document.getElementById("lang-toggle");
    if (toggle) {
      toggle.textContent = lang === "zh" ? "EN" : "中文";
      toggle.setAttribute("aria-label", lang === "zh" ? "Switch to English" : "切换到中文");
    }

    localStorage.setItem(LANG_KEY, lang);
  }

  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const current = document.documentElement.lang === "zh" ? "zh" : "en";
      setLang(current === "zh" ? "en" : "zh");
    });
  }

  setLang(getInitialLang());
})();
