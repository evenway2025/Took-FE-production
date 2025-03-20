## 🛠 로컬 환경 셋업

### 1. Node Version 관련

- local node version을 세팅하는 과정입니다.

> 아래 명령어를 실행해서 node version을 변경해주세요.
>
> 만약 [nvm](https://github.com/nvm-sh/nvm) 이 설치되어 있지 않다면, 먼저 설치해주세요.

```bash
$ nvm use
```

### 2. Local Host 관련

- localhost 를 http에서 https로 설정하는 과정입니다.

> 아래 명령어를 프로젝트 root에서 순서대로 실행하고, 안내에 따라 환경 세팅을 이어가주세요.
>
> 만약 본인의 장비에 brew가 설치되어 있지 않다면, [이 과정](https://brew.sh/)을 통해 brew를 먼저 설치해주세요.

```bash
$ brew install mkcert
$ mkcert -install
$ pnpm i
$ pnpm run setup
$ pnpm run dev
```
