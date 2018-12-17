# Twe

[![](https://badges.greenkeeper.io/LitoMore/twe.svg)](https://greenkeeper.io/)
[![](https://img.shields.io/travis/LitoMore/twe/master.svg)](https://travis-ci.org/LitoMore/twe)
[![](https://img.shields.io/npm/v/twe.svg)](https://www.npmjs.com/package/twe)
[![](https://img.shields.io/npm/l/twe.svg)](https://github.com/LitoMore/twe/blob/master/LICENSE)
[![](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

CLI for Twitter

<div align="center"><img src="https://raw.githubusercontent.com/LitoMore/twe/master/screenshot.png" alt="Twe" /></div>

## Features

- [x] Fetch home-timeline
- [x] Fetch mentions-timeline
- [x] Fetch user-timeline
- [x] Post statuses
- [x] Customizable color themes
- [ ] Multiple account login (WIP)
- [ ] Post media (WIP)
- [ ] Post photo from clipboard (WIP)

## Install

```bash
$ npm i -g twe
```

## Config

1. Register a Twitter app with your Twitter developer account
2. Give the app `Read and Write` permission and access to your account
3. Run `twe setup` for setup your keys and tokens

## Usage

```
Usage
  $ twe               Fetch home-timeline
  $ twe h|home        Fetch home-timeline
  $ twe m|mentions    Fetch mentions-timeline
  $ twe setup         Setup tokens
  $ twe colors        Config color themes
  $ twe <status> ...  Post status
  $ twe --count=10    Fetch with parameters
```

### Color scheme

Use `twe colors` to customize your color scheme.

<img width="50%" height="50%" src="https://raw.githubusercontent.com/LitoMore/twe/master/media/twe-colors.gif" alt="twe-colors" />

## Related

- [twii](https://github.com/LitoMore/twii) - API for this module

## License

MIT © [LitoMore](https://github.com/LitoMore)
