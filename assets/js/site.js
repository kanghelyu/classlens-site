(function () {
  "use strict";

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

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  const navLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  function setActiveNav() {
    const scrollPosition = window.scrollY + 150;
    let current = "";
    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) current = section.id;
    });
    navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`));
  }

  const backToTop = document.querySelector(".back-to-top");
  function handleScroll() {
    setActiveNav();
    if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > 520);
  }
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  const phoneFrame = document.querySelector(".phone-frame");
  const heroVisual = document.querySelector(".hero-visual");
  if (phoneFrame && heroVisual && window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroVisual.addEventListener("mousemove", (event) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      phoneFrame.style.animation = "none";
      phoneFrame.style.transform = `translateY(-4px) rotateY(${x * -10}deg) rotateX(${y * 7}deg)`;
    });
    heroVisual.addEventListener("mouseleave", () => {
      phoneFrame.style.animation = "";
      phoneFrame.style.transform = "";
    });
  }

  const I18N = {
    en: {
      docTitle: "ClassLens AI | Your classes, seen clearly.",
      metaDesc: "ClassLens AI is a local-first timetable with optional AI-assisted import.",
      ogTitle: "ClassLens AI | Your classes, seen clearly.",
      ogDesc: "A local-first timetable with optional AI-assisted import.",
      noticeChannel: "ClassLens AI Android release channel",
      noticeManifest: "View the current build",
      brandName: "ClassLens AI",
      navProduct: "Product",
      navFlow: "Flow",
      navProviders: "Routes",
      navTrust: "Trust",
      navDownload: "Download",
      heroKicker: "A calmer way to carry your semester",
      heroTitle: "Your classes,<br><em>seen clearly.</em>",
      heroSummary: "A local-first timetable for the everyday rhythm of campus — with optional AI assistance when the source material is messy.",
      heroDownload: "Download APK",
      heroExplore: "See how it works <span aria-hidden=\"true\">↘</span>",
      heroFootnote: "No account. No built-in key. Your review stays in the loop.",
      briefLabel: "CURRENT RELEASE",
      labelPublished: "Published",
      labelMinAndroid: "Minimum Android",
      chipLocal: "local-first",
      chipReview: "review first",
      heroMetaOne: "Built for Android 8+",
      heroMetaTwo: "Import screenshots, PDFs, or existing files",
      heroMetaThree: "Keep the schedule on your device",
      proof1Title: "Local by default",
      proof1Desc: "Your timetable lives on your device, not in a dashboard.",
      proof2Title: "Preview before write",
      proof2Desc: "Imported results are something to check, not blindly accept.",
      proof3Title: "Bring your own route",
      proof3Desc: "AI is optional, explicit, and configured by you.",
      flowKicker: "The ClassLens flow",
      flowTitle: "From source material<br><em>to a week you can trust.</em>",
      flowDesc: "The app stays simple where it should. Bring in what you already have, look over the result, then shape the view around the way you actually study.",
      flowTab1: "Import",
      flowTab2: "AI chat",
      flowTab3: "Make it yours",
      flowPanel1Kicker: "Bring the schedule in",
      flowPanel1Note: "Existing courses are never silently overwritten.",
      flowPanel2Kicker: "Ask in plain language",
      flowPanel2Note: "Review the preview against the original before you rely on it.",
      flowPanel3Kicker: "Tune the glass",
      flowPanel3Note: "Tap the preview to drag and crop where your background sits.",
      feat1Title: "Bring it in with AI",
      feat1Desc: "Describe your timetable in a message or send a file — the assistant reads it, and you review the result before it lands in the week.",
      feat2Title: "Three entrances, one review flow",
      feat2Desc: "Open your school's login page straight from the app, or bring files as ICS, CSV, JSON, HTML, XLSX or DOCX. It parses locally — nothing is sent to the network.",
      feat3Title: "Liquid-glass appearance",
      feat3Desc: "Adjust background blur, scrim, and glass material — from real-time liquid glass to frosted panels.",
      dlKicker: "The current build",
      dlTitle: "A small download.<br><em>A clear starting point.</em>",
      dlDesc: "All release values come from a single local manifest. Verify the SHA-256 before installing any APK obtained outside an app store.",
      dlApkLabel: "ANDROID APK",
      labelSize: "Package size",
      labelSha: "SHA-256",
      copySha: "Copy",
      copySuccess: "Copied",
      copyFailure: "Select to copy",
      dlDownload: "Download APK",
      dlNotes: "Read release notes",
      downloadAssurance: "The release page contains no API keys, uploads, or embedded analytics.",
      impKicker: "Before you send anything",
      impTitle: "Start with the original material.",
      impDesc: "Keep a copy of the source document and use traditional import when you need to bring existing course files into your study workflow.",
      imp1Title: "Traditional import",
      imp1Desc: "Select your existing material from device storage, then review the imported result against the source before relying on it for study or submission.",
      imp2Title: "Visual-model warning",
      imp2Desc: "Vision-capable models can miss small text, handwriting, tables, equation layout, rotations, and context across pages. Treat visual output as assistance, not an authoritative reading.",
      imp3Title: "Share deliberately",
      imp3Desc: "Only submit material you are allowed to share. Remove sensitive personal information before sending text, pages, or images to a remote AI provider.",
      provKicker: "Data routes",
      provTitle: "Know what leaves the device.",
      provDesc: "Availability depends on the provider and model you configure. Each route makes the boundary visible before you use it.",
      routeLocalBadge: "LOCAL",
      routeRemoteBadge: "REMOTE",
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
      privacy: "Trust, in plain language",
      privTitle: "A release page without hidden credentials.",
      privDesc: "This static site contains no API keys, does not ask for provider credentials, and does not send your class material anywhere.",
      priv1Title: "Provider boundaries",
      priv1Desc: "When you choose to submit content through a configured AI route, that provider's terms, retention practices, and privacy policy govern the submitted content.",
      priv2Title: "Release-page scope",
      priv2Desc: "The release page is informational. It does not collect uploads, account data, or provider keys, and it has no embedded analytics or third-party media.",
      priv3Title: "Your review",
      priv3Desc: "Check the APK source and SHA-256 before installation, and only use materials you have the right to process.",
      licenses: "Licenses",
      licTitle: "License information belongs with the build.",
      licAppTitle: "ClassLens application license",
      licThirdTitle: "Third-party notices",
      licThirdDesc: "Published with the final build and source distribution, where applicable.",
      licModelTitle: "Model and provider terms",
      licModelDesc: "Reviewed separately under the terms of the provider and model you choose.",
      footerDesc: "Static Android release information"
    },
    zh: {
      docTitle: "课镜 AI | 让你的课程，一目了然。",
      metaDesc: "课镜 AI 是一款本地优先的课表，支持可选的 AI 辅助导入。",
      ogTitle: "课镜 AI | 让你的课程，一目了然。",
      ogDesc: "本地优先的课表，配合可选的 AI 辅助导入。",
      noticeChannel: "课镜 AI Android 发布渠道",
      noticeManifest: "查看当前构建",
      brandName: "课镜 AI",
      navProduct: "产品",
      navFlow: "流程",
      navProviders: "路径",
      navTrust: "信任",
      navDownload: "下载",
      heroKicker: "让学期节奏，安静地归位",
      heroTitle: "让你的课程，<br><em>一目了然。</em>",
      heroSummary: "一款本地优先的课表，陪你应对校园日常；当原始资料杂乱时，再按需调用 AI 辅助整理。",
      heroDownload: "下载 APK",
      heroExplore: "了解使用流程 <span aria-hidden=\"true\">↘</span>",
      heroFootnote: "无需账号。没有内置密钥。导入结果由你亲自核对。",
      briefLabel: "当前版本",
      labelPublished: "发布日期",
      labelMinAndroid: "最低 Android 版本",
      chipLocal: "本地优先",
      chipReview: "先核对",
      heroMetaOne: "支持 Android 8+",
      heroMetaTwo: "导入截图、PDF 或已有文件",
      heroMetaThree: "让课表留在你的设备上",
      proof1Title: "默认保存在本地",
      proof1Desc: "你的课表属于你的设备，而不是某个后台面板。",
      proof2Title: "写入前先预览",
      proof2Desc: "导入结果需要核对，而不是直接盲目接受。",
      proof3Title: "自己选择路径",
      proof3Desc: "AI 是可选、明确且由你配置的能力。",
      flowKicker: "课镜 AI 的使用流程",
      flowTitle: "从原始资料，<br><em>到值得信任的一周。</em>",
      flowDesc: "该简单的地方保持简单。带上你已有的资料，先看一遍结果，再按真正的学习习惯调整课表。",
      flowTab1: "导入",
      flowTab2: "AI 对话",
      flowTab3: "定制",
      flowPanel1Kicker: "把课表带进来",
      flowPanel1Note: "已有课程不会被静默覆盖。",
      flowPanel2Kicker: "用自然语言描述",
      flowPanel2Note: "依赖结果前，先对照原始资料检查预览。",
      flowPanel3Kicker: "调节玻璃质感",
      flowPanel3Note: "点击预览可拖动裁切背景。",
      feat1Title: "AI 对话，帮你导入",
      feat1Desc: "发一段描述或直接发送文件，AI 负责整理成课程；写入课表前由你核对。",
      feat2Title: "三种入口，统一核对流程",
      feat2Desc: "在应用内直接打开学校教务系统登录页，或导入 ICS、CSV、JSON、HTML、XLSX、DOCX 等文件。本地解析，不发送到网络。",
      feat3Title: "液态玻璃外观",
      feat3Desc: "调节背景模糊、背景遮罩，以及玻璃材质——从实时液态玻璃到玻璃磨砂。",
      dlKicker: "当前构建",
      dlTitle: "下载很小。<br><em>开始很清楚。</em>",
      dlDesc: "所有发布信息都来自一份本地清单。安装应用商店之外的 APK 前，请先核对 SHA-256。",
      dlApkLabel: "ANDROID APK",
      labelSize: "安装包大小",
      labelSha: "SHA-256",
      copySha: "复制",
      copySuccess: "已复制",
      copyFailure: "请手动选择",
      dlDownload: "下载 APK",
      dlNotes: "查看发布说明",
      downloadAssurance: "发布页不含 API 密钥、上传功能或内嵌分析。",
      impKicker: "发送资料前",
      impTitle: "从原始资料开始。",
      impDesc: "保留一份源文件副本；需要将已有课程文件纳入学习流程时，可以使用传统导入。",
      imp1Title: "传统导入",
      imp1Desc: "从设备存储中选择已有资料，在用于学习或提交前，对照源文件核对导入结果。",
      imp2Title: "视觉模型提醒",
      imp2Desc: "具备视觉能力的模型可能遗漏小字、手写、表格、公式排版、旋转角度以及跨页上下文。请将视觉输出视为辅助，而非权威解读。",
      imp3Title: "谨慎分享",
      imp3Desc: "只提交你有权分享的资料。在向远程 AI 服务商发送文字、页面或图片前，请先移除敏感个人信息。",
      provKicker: "数据路径",
      provTitle: "了解什么会离开设备。",
      provDesc: "可用性取决于你配置的服务商与模型。每条路径都会在使用前把边界说清楚。",
      routeLocalBadge: "本地",
      routeRemoteBadge: "远程",
      thProviderReq: "服务商要求",
      thLeaves: "可能离开设备的内容",
      thLimitation: "重要限制",
      rowTraditional: "传统导入",
      valNone: "无",
      cellTrad1: "选择源资料无需向 AI 服务商发起请求。",
      cellTrad2: "导入内容仍需你核对完整性与格式。",
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
      privacy: "把信任说得直白",
      privTitle: "没有隐藏凭据的发布页。",
      privDesc: "这个静态站点不含 API 密钥，不会索取服务商凭据，也不会将你的课程资料发送到任何地方。",
      priv1Title: "服务商边界",
      priv1Desc: "当你选择通过已配置的 AI 路径提交内容时，该服务商的条款、留存策略与隐私政策将约束所提交的内容。",
      priv2Title: "发布页范围",
      priv2Desc: "发布页仅用于展示信息。它不会收集上传内容、账户数据或服务商密钥，也不包含任何内嵌的分析或第三方媒体。",
      priv3Title: "你的核对",
      priv3Desc: "安装前请核对 APK 来源与 SHA-256，并且只使用你有权处理的资料。",
      licenses: "许可",
      licTitle: "许可信息随构建版本提供。",
      licAppTitle: "ClassLens 应用许可",
      licThirdTitle: "第三方声明",
      licThirdDesc: "随最终构建与源码分发一并提供（如适用）。",
      licModelTitle: "模型与服务商条款",
      licModelDesc: "根据你选择的服务商与模型条款另行审阅。",
      footerDesc: "Android 发布信息（静态站点）"
    }
  };

  const LANG_KEY = "classlens-lang";
  let currentLang = "en";

  function getInitialLang() {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "zh" || saved === "en") return saved;
    return (navigator.language || "en").toLowerCase().startsWith("zh") ? "zh" : "en";
  }

  function applyI18nValue(element, value) {
    if (value == null) return;
    if (/<[a-z][\s\S]*>/i.test(value)) element.innerHTML = value;
    else element.textContent = value;
  }

  function setLang(lang) {
    const dict = I18N[lang];
    if (!dict) return;
    currentLang = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((element) => applyI18nValue(element, dict[element.dataset.i18n]));
    if (dict.docTitle) document.title = dict.docTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && dict.metaDesc) meta.setAttribute("content", dict.metaDesc);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogTitle && dict.ogTitle) ogTitle.setAttribute("content", dict.ogTitle);
    if (ogDesc && dict.ogDesc) ogDesc.setAttribute("content", dict.ogDesc);
    const toggle = document.getElementById("lang-toggle");
    if (toggle) {
      toggle.textContent = lang === "zh" ? "EN" : "中文";
      toggle.setAttribute("aria-label", lang === "zh" ? "Switch to English" : "切换到中文");
    }
    document.querySelectorAll("[data-copy-sha]").forEach((button) => { button.textContent = dict.copySha; });
    localStorage.setItem(LANG_KEY, lang);
  }

  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) langToggle.addEventListener("click", () => setLang(currentLang === "zh" ? "en" : "zh"));

  const workflowTabs = Array.from(document.querySelectorAll("[data-workflow-tab]"));
  const workflowPanels = Array.from(document.querySelectorAll("[data-workflow-panel]"));
  function activateWorkflow(index, moveFocus) {
    workflowTabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.setAttribute("tabindex", active ? "0" : "-1");
    });
    workflowPanels.forEach((panel, panelIndex) => {
      const active = panelIndex === index;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });
    if (moveFocus && workflowTabs[index]) workflowTabs[index].focus();
  }
  workflowTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateWorkflow(index, false));
    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowDown" && event.key !== "ArrowLeft" && event.key !== "ArrowUp") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
      activateWorkflow((index + direction + workflowTabs.length) % workflowTabs.length, true);
    });
  });

  const copyButton = document.querySelector("[data-copy-sha]");
  const shaElement = document.querySelector('[data-release-field="sha256"]');
  const copyFeedback = document.querySelector("[data-copy-feedback]");
  if (copyButton && shaElement) {
    copyButton.addEventListener("click", async () => {
      const value = shaElement.textContent.trim();
      let copied = false;
      if (navigator.clipboard && window.isSecureContext) {
        try { await navigator.clipboard.writeText(value); copied = true; } catch (error) { copied = false; }
      }
      if (!copied) {
        const range = document.createRange();
        range.selectNodeContents(shaElement);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
      if (copyFeedback) copyFeedback.textContent = I18N[currentLang][copied ? "copySuccess" : "copyFailure"];
      window.setTimeout(() => { if (copyFeedback) copyFeedback.textContent = ""; }, 2200);
    });
  }

  setLang(getInitialLang());
})();
