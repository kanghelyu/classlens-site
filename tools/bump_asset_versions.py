#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
给 index.html 里引用的每个静态资源打上「内容哈希」版本键。

为什么需要：
GitHub Pages 给静态资源发的是 `cache-control: max-age=14400`（4 小时）。如果替换了
同名的图片 / CSS / JS，浏览器在 4 小时内**不会去看新文件**，页面就一直显示旧图。
加一个随内容变化的查询参数（`?v=<内容哈希>`）即可让浏览器立刻取新文件；
而内容没变的资源哈希不变，缓存照旧命中，不会白白失效。

用法（在站点目录里执行）：
    python3 tools/bump_asset_versions.py            # 写入 index.html
    python3 tools/bump_asset_versions.py --check    # 只报告差异，不写入（CI/自检用）

要点：
- 以**文件内容**为准，不依赖时间戳 / 手写日期，所以不会漏、也不会误伤。
- 幂等：重复运行不会改动已正确的引用。
- 换了图片但没改 index.html 时，重跑本脚本即可（只动那一张图的版本键）。
"""
import argparse
import hashlib
import pathlib
import re
import sys

INDEX = pathlib.Path("index.html")
# 同时匹配 href / src，允许已经带 ?v=...（会被重算替换）
REF = re.compile(r'((?:href|src)=")(assets/[^"?]+)(?:\?v=[^"]*)?(")')


def short_hash(path: pathlib.Path, length: int = 10) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()[:length]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true", help="只报告差异，不写入")
    args = ap.parse_args()

    if not INDEX.exists():
        sys.exit("当前目录下找不到 index.html（请在站点根目录运行）")

    text = INDEX.read_text(encoding="utf-8")
    changes = []
    missing = []

    def repl(m: "re.Match[str]") -> str:
        prefix, rel, quote = m.group(1), m.group(2), m.group(3)
        p = pathlib.Path(rel)
        if not p.exists():
            missing.append(rel)
            return m.group(0)
        h = short_hash(p)
        new = f"{prefix}{rel}?v={h}{quote}"
        if new != m.group(0):
            changes.append((rel, h))
        return new

    updated = REF.sub(repl, text)

    if changes:
        print(f"需要更新版本键的资源 {len(changes)} 个：")
        for rel, h in changes:
            print(f"  {rel}  →  ?v={h}")
    else:
        print("所有资源的版本键都已是最新，无需改动")

    if missing:
        print("警告：index.html 引用了不存在的文件（已跳过）：")
        for rel in missing:
            print(f"  {rel}")

    if args.check:
        return 1 if changes else 0

    if changes:
        INDEX.write_text(updated, encoding="utf-8")
        print("已写入 index.html")
    return 0


if __name__ == "__main__":
    sys.exit(main())
