# 唯美極簡五子棋 (Zen Gomoku)

一個純前端開發的五子棋遊戲，採用現代化的 Glassmorphism 設計風格，提供優雅的遊戲體驗。
A pure frontend Gomoku game featuring modern Glassmorphism design for an elegant gaming experience.

![Gomoku Preview](preview.png)
*(請自行截圖並命名為 preview.png 放入資料夾中以顯示預覽圖)*

## 🎮 遊戲特色 (Features)

*   **極簡美學**: 深色質感背景搭配玻璃擬態 UI。
*   **流暢動畫**: 落子時的縮放動畫與游標互動效果。
*   **響應式設計**: 支援各種螢幕尺寸，手機也能遊玩。
*   **完整規則**: 
    *   15x15 標準棋盤。
    *   自動偵測五連勝（橫、直、斜）。
    *   防止重複落子。
    *   輪流下子機制（黑方先行）。

## 🚀 如何執行 (How to Run)

由於這是純靜態網頁，您有幾種方式可以執行：

### 方法 1: 直接開啟
直接雙擊 `index.html` 檔案，在瀏覽器中開啟即可遊玩。

### 方法 2: 使用 Live Server (推薦)
如果您使用 VS Code，安裝 "Live Server" 擴充套件，右鍵點擊 `index.html` 選擇 "Open with Live Server"。

## 📦 部署至 Vercel (Deployment)

本專案符合期末專題規定，可直接部署至 Vercel：

1.  將本專案推送到您的 GitHub Repository。
2.  登入 [Vercel](https://vercel.com/)。
3.  點擊 "Add New Project" -> "Winport" 選擇您的 Repository。
4.  Framework Preset 選擇 "Other" (或保留預設)。
5.  點擊 "Deploy"。

## 🛠️ 技術棧 (Tech Stack)

*   **HTML5**: 語意化標籤。
*   **CSS3**: Flexbox, Grid, CSS Variables, Backdrop Filter。
*   **JavaScript (Vanilla)**: 原生 DOM 操作，無依賴任何框架。

---
Created for Final Project Topic 2: Frontend Mini-Game.
