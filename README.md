# 📈 Coin-List

사이트 주소와 화면 캡쳐해서 넣기  
🔗 **배포 주소:** [Coin List](https://eileen819.github.io/coin-list)

<br/>

## 📌 프로젝트 개요

- **Coin List**는 **실시간 암호 화폐 정보를 제공**하는 웹 어플리케이션입니다.
- React, Typescript 및 다양한 라이브러리의 학습을 위해 개발되었으며, 사용자가 **다양한 암호 화폐의 가격 변동 내역을 쉽게 확인**할 수 있도록 설계되었습니다.
- **차트 및 컨버터 기능**을 통해 데이터를 직관적으로 이해할 수 있도록 하였으며, **다크 모드 지원 및 모바일 최적화 UI**를 제공하여 사용자의 편의성도 극대화하였습니다.

<br/>

## 💡 주요 기능

### ✅ 실시간 코인 가격 및 차트 제공

- 현재 암호 화폐의 가격, 순위를 실시간으로 확인 가능
- 오늘의 High, Low, Opening, Closing 가격 확인 가능
- `React-Query`를 활용해 API 데이터를 페칭
- `Apex Chart`를 사용한 라인 차트 & 캔들 차트 제공 (지난 3주간 데이터 확인 가능)

### ✅ 코인 & USD 변환 기능 (컨버터)

- **암호 화폐 ↔ USD** 간 변환 지원
- `useState` 활용하여 상태 관리하며, 실시간 환율을 반영함

### ✅ 다크 모드 지원

- 사용자의 선호에 따라 **다크 모드 / 라이트 모드 전환** 가능
- **Recoil**을 활용한 글로벌 상태 관리를 적용
- `styled-components`의 `ThemeProvider`를 활용해서 스타일링을 적용

### ✅ 모바일 최적화 UI

- 모바일에 최적화된 UI로 어디서든 손쉽게 코인 가격 확인 가능

  <br/>

## 🔎 역할과 기여도

- 개인 프로젝트로 기획, 설계, 개발 및 배포까지 **전 과정을 담당**
- 강의를 통해 배운 것들을 바탕으로 기본 기능을 구현한 후, **추가적인 기능을 직접 개발**하여 확장
- **React + TypeScript 기반으로 프로젝트 아키텍처 설계**
- **Apex Chart를 활용한 차트 시각화**
- **React-Query 및 Recoil을 활용한 상태 관리 적용**
- **GitHub Pages를 활용한 배포**

  <br/>

## 🛠️ 사용한 기술 스택

| 분류                 | 기술                                                                            |
| -------------------- | ------------------------------------------------------------------------------- |
| **Frontend**         | React, Javascript, Typescript, React-Router-Dom, Apex Chart, React-Helmet-Async |
| **State Management** | Recoil, React-Query(Tanstack-Query)                                             |
| **Styling**          | Styled-Components, Styled-Reset                                                 |
| **API & Data**       | coinpaprica API, nomadcoders API                                                |
| **Deployment**       | gh-pages                                                                        |

<br/>

## 📁 프로젝트 구조

```
src
 ┣ components
 ┃ ┣ Converter.tsx
 ┃ ┗ Header.tsx
 ┣ routes
 ┃ ┣ Chart.tsx
 ┃ ┣ Coin.tsx
 ┃ ┣ Home.tsx
 ┃ ┗ Price.tsx
 ┣ App.tsx
 ┣ api.ts
 ┣ atom.ts
 ┣ index.tsx
 ┣ interface.tsx
 ┣ router.tsx
 ┣ styled.d.ts
 ┗ theme.ts
```

  <br/>

## 🚀 배포 방법

이 프로젝트는 GitHub의 **GitHub Pages**를 활용하여 배포됩니다.  
React 애플리케이션을 정적 파일로 빌드한 후, `gh-pages` 브랜치에 배포하는 방식입니다.  
코드를 GitHub에 push하는 것만으로는 배포되지 않으며, **수동으로 `npm run deploy` 명령어를 실행해야 업데이트됩니다.**

### 🖥️ 로컬 실행 방법

**프로젝트 클론**

```bash
$ git clone https://github.com/eileen819/coin-list.git
$ cd coin-list
$ npm install
$ npm start
```

  <br/>

## 🔄 개선 예정 기능 (업데이트 계획)

_추후 추가 예정_

<br/>

## 📚 기술적 학습 및 인사이트

### 📍 React + TypeScript 기반 프로젝트 아키텍처 설계

- `Create-React-App`을 사용하여 프로젝트 아키텍처를 설계
- TypeScript를 적용하여 안정적인 컴포넌트 설계
- Props 및 State의 타입을 정의하여 **런타임 오류 방지 및 코드 가독성 향상**

### 📍 Styled-Components를 활용한 UI 설계

- **CSS-in-JS 방식**을 사용하여 컴포넌트 기반의 스타일링 적용
- **다크 모드 지원을 위해 `ThemeProvider`를 활용**
- `createGlobalStyle`을 사용해 전역 스타일을 관리

### 📍 React-Query(Tanstack-Query) 및 Recoil을 활용한 상태 관리

- API 데이터 페칭 및 캐싱 적용
- 글로벌 상태 관리 및 다크 모드 구현, 사용자 설정 유지

### 📍 Apex Chart를 활용한 차트 구현

- `ApexChart`를 활용하여 **실시간 암호화폐 가격 데이터를 차트로 시각화**
- **라인 차트 & 캔들 차트 구성**

### 📍 GitHub Pages를 활용한 배포

- `gh-pages` 라이브러리를 이용하여 **정적 React 앱 배포**

  <br/>

## 🪪 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
