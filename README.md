# React Netease Music

React Netease Music——It is a music application.

I always want to make a music player. Recently I found out there is an API provide music resource. So I decided
make a application based on that. The code use react. Did not use any additional database. I am welcome your
advice!

## project address

[NetMusic](https://netmusic-eebee.web.app/)

## Functionality

- [] 登录/登出（目前仅支持手机密码登录）
- [x] discovery
  - [] banner
  - [x] recommend playlist
  - [] recommend MV
- [] Daily music update
- [x] All playlist
  - [] playlist search
- [x] playlist record
  - [x] history
- [x] Search
  - [x] search with keyword
  - [] search suggestion
  - [] search page
- [ ] rank
- [ ] singer page
- [ ] singer detail page
- [ ] MV related and play functionality
- [ ] created, edit, destroy playlist
- [ ] message
- [ ] change theme
- [ ] ......Add more functionality based on mood😂

Caution: Some songs cannot be play because of license.

## tech

- React，use react hook for state management，did not use any additional database。
- Material ui for the spinner, and UI,
- https://github.com/lijinke666/react-music-player beautify music player
- CSS Modules。
- Webpack。
- Eslint 做代码检查。

## API

[NeteaseCloudMusicApi](https://binaryify.github.io/NeteaseCloudMusicApi)

## 播放器的相关截图

![01_个性推荐页](./resources/01_个性推荐页.png)

![02_每日歌曲推荐](./resources/02_每日歌曲推荐.png)

![03_全部歌单](./resources/03_全部歌单.png)

![04_最新音乐页](./resources/04_最新音乐页.png)

![05_歌单详情页](./resources/05_歌单详情页.png)

![06_音乐播放详情](./resources/06_音乐播放详情.png)

![07_播放记录功能](./resources/07_播放记录功能.png)

![08_搜索功能](./resources/08_搜索功能.png)

![09_搜索结果页](./resources/09_搜索结果页.png)

## Start Project

```
yarn
yarn dev
```

visit in browser：`http://localhost:3000`
