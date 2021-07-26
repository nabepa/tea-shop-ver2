# Teashop

Read this in other languages: [한국어 🇰🇷](README.ko.md)

You can try this app, click below badge!
</br>

<a href="https://teashop-nabepa.netlify.app/" target="_blank">![Netlify Status](https://api.netlify.com/api/v1/badges/aea01573-e082-44b4-8617-12e71bf71494/deploy-status)</a>

![inApp](/image/tea-shop.png)

## 🚀 概要

- 茶っ葉を販売するサイトを想定し，フロント側とバックエンド側を実装
- テスト用アカウント
  - 管理者ユーザー ID: tim@test.com PW: 123456
  - 一般ユーザー ID: john@test.com PW: 123456

## ⭐️ 機能

### 実装済み 🙆🏻‍♀️

- 会員登録とログイン
<p>
  <img src="image/register.png" height="250">
</p>

- 商品登録(管理者アカウントのみ)
<p>
  <img src="image/upload.png" height="250">
</p>

- カテゴリ別商品閲覧
<p>
  <img src="image/category.png" height="250">
</p>

- 商品詳細情報閲覧
<p>
  <img src="image/detail.png" width="340">
</p>

### 開発中 🙅🏻

- 登録商品の修正・削除
- カートに追加
- 購入
- 商品検索

## 🦄 使用言語とフレームワーク

### Client side

<p>
    <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=black"/>&nbsp;&nbsp;
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=black"/>&nbsp;&nbsp;
    <img src="https://img.shields.io/badge/materialui-%230081CB.svg?style=flat&logo=material-ui&logoColor=white"/>&nbsp;&nbsp;
 </p>

### Server side

<p>
    <img src="https://img.shields.io/badge/node.js-%2343853D.svg?style=flat&logo=node-dot-js&logoColor=white"/>&nbsp;&nbsp;
    <img alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB"/>&nbsp;&nbsp;
</p>

## 📚 使用ライブラリとツール

### Client side

- [axios]() : データ fetch 用
- [react-router-dom]() : page routing
- [react-hook-form]() : form 提出データの有効性検査
- [Netlify]() : Client side 配布

### Server side

- [bcrypt]() : パスワード暗号化
- [jsonwebtoken]() : ユーザー認証のための Token
- [sequelize]() : Postgres のための ORM
- [dotenv]() : configuration 設定
- [postman]() : サーバー動作確認用
- [Heroku]() : Server side 配布

### その他

- [Cloudinary]() : 写真保存用の cloud service

## 📖 Project で新しく勉強した事

## 🐛 Debug 記録
