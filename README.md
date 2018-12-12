# Twe

CLI for Twitter

## Features

- [x] Fetch home-timeline
- [x] Fetch mentions-timeline
- [x] Fetch user-timeline
- [x] Post statuses
- [x] Customizable color themes (WIP)
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
```

## Related

- [twii](https://github.com/LitoMore/twii) - API for this module

## License

MIT © [LitoMore](https://github.com/LitoMore)
