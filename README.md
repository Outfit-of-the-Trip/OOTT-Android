# OOTT - Outfit Of The Trip

<img width="911" alt="Screen Shot 2023-10-18 at 10 42 55 AM" src="https://github.com/Outfit-of-the-Trip/OOTT-Android/assets/117811685/c532fcc6-92ce-4964-be5f-8e99ccabe1c3">

## ✈️ OOTT : 개인 맞춤형 여행 코디네이터 🛳

여행지, 날씨, 여행 친구 등 여러가지 요소를 고려하여 사용자에게 여행에 맞는 코디 정보를 제공

## 📄 INDEX

<details>
<summary>Details</summary>
   
   1. 프로젝트 소개 (Intro)
   2. 기술 스택 (Technique used)
   3. 디렉토리 구조 (Directory Structure)
   4. 설치 안내 (How to Download)
   5. 팀원 정보 (Meet the team)
</details>

## 1. 프로젝트 소개 (Intro)

#### 개요

여행지에서의 패션은 추억을 쌓고 자신의 스타일을 표현하는데 중요한 역할을 합니다. 그러나 여행지, 날씨, 여행 친구, 여행 목적 등 다양한 요소를 고려하여 코디를 선택하는 것은 사람들에게 피로감과 스트레스를 줄 수 있습니다.

**OOTT**는 사용자가 코디를 선택하는 피로감을 줄여 여행을 즐기는데 도움을 주는 여행 코디 추천 앱입니다. 

사용자는 OOTT를 통해 여행 코디를 추천받아 즐거운 여행을 경험할 수 있습니다.


## 2. 기술 스택 (Technique used)

#### Web & App
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"/> <img src="https://img.shields.io/badge/React Native-61DAFB?style=for-the-badge&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white"> <img src="https://img.shields.io/badge/unity-000000?style=for-the-badge&logo=unity&logoColor=white"> <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">

#### Backend
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white"/> <img src="https://img.shields.io/badge/fastapi-009688?style=for-the-badge&logo=fastapi&logoColor=white"/>

#### Database
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>

#### AI
<img src="https://img.shields.io/badge/tensorflow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white"/> <img src="https://img.shields.io/badge/opencv-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white"/> <img src="https://img.shields.io/badge/yolo-00FFFF?style=for-the-badge&logo=yolo&logoColor=black"/>

#### DevOps
<img src="https://img.shields.io/badge/google cloud platform-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white"/> <img src="https://img.shields.io/badge/aws lambda-DDB320?style=for-the-badge&logo=awslambda&logoColor=white"/> <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>

## 3. 디렉토리 & Database 구조 (Directory & Database Structure)
- 디렉토리 구조
```
/src
.
├── App.js
├── RecoilApp.js
├── apis
├── assets
│   ├── Loading
│   ├── fonts
│   └── images
├── components
│   ├── Navigation
├── constants
├── screens
│   ├── FirstSetting
│   ├── FriendScreen
│   ├── HomeScreen
│   ├── IsFirstLoginScreen
│   ├── MainScreen
│   ├── MypageScreen
│   ├── OOTTScreen
│   │   ├── CalendarSheet
│   │   ├── RecomendSceen
│   │   ├── TravelCategory
│   │   ├── TravelFriends
│   │   ├── TravelPlace
│   ├── PhotozoneScreen
│   └── UnityScreen
├── states
└── utils
```

- Database ERD
  
![OOTT](https://github.com/Outfit-of-the-Trip/OOTT-Android/assets/117811685/8f13f5ec-2c59-4f0f-9eee-952a8dff1d73)




## 4. 설치 안내 (How to Download)
- 에뮬레이터로 실행 시 백엔드 서버 URL 설정

```js
// src/constants/url.js

const backendURL = "[Your backend Server URL]"
/*
   ....
*/
```

- google play 설치 주소 →
[여행 가서 뭐 입지?](https://play.google.com/store/apps/details?id=com.oott&pli=1)

## 5. 팀원 정보 (Meet the team)

|Profile|Name|Role|Contact|Github|
|:----:|:----:|:-------:|:-------:|:----:|
|<img src='https://avatars.githubusercontent.com/u/102947178?v=4' height="100" width="100">|전설|팀장, 기획, RS 개발|	wjstjf2003@gmail.com|<a href="https://github.com/LEGEND-Jeon" target="_blank"><img src="https://img.shields.io/badge/LEGEND Jeon-000000?style=for-the-badge&logo=github&logoColor=white"/></a>|
|<img src='https://avatars.githubusercontent.com/u/137314130?v=4' height="100" width="100">|김민서|Unity, 앱 디자인|	minseoswp@gmail.com|<a href="https://github.com/minseoswp" target="_blank"><img src="https://img.shields.io/badge/minseoswp-000000?style=for-the-badge&logo=github&logoColor=white"></a>|
|<img src='https://avatars.githubusercontent.com/u/117811685?s=96&v=4' height="100" width="100">|박성훈|앱 개발, 백엔드 개발|	aest3ra@gmail.com|<a href="https://github.com/aest3ra" target="_blank"><img src="https://img.shields.io/badge/aest3ra-000000?style=for-the-badge&logo=github&logoColor=white"></a>|
|<img src='https://avatars.githubusercontent.com/u/68190553?s=64&v=4' height="100" width="100">|박재우|인공지능 개발|	jerife@naver.com|<a href="https://github.com/jerife" target="_blank"><img src="https://img.shields.io/badge/jerife-000000?style=for-the-badge&logo=github&logoColor=white"></a>|
|<img src='https://avatars.githubusercontent.com/u/93309061?s=64&v=4' height="100" width="100">|서근재|앱 개발|	zeus990506@gmail.com|<a href="https://github.com/tjrmswo" target="_blank"><img src="https://img.shields.io/badge/tjrmswo-000000?style=for-the-badge&logo=github&logoColor=white"></a>|
|<img src='https://avatars.githubusercontent.com/u/101693143?v=4' height="100" width="100">|양준민|앱 개발|	yjm9575m89@gmail.com|<a href="https://github.com/mlnj27" target="_blank"><img src="https://img.shields.io/badge/mlnj27-000000?style=for-the-badge&logo=github&logoColor=white"></a>|
|<img src='https://avatars.githubusercontent.com/u/94755822?v=4' height="100" width="100">|정성욱|앱 개발|	black7410@sungkyul.ac.kr|<a href="https://github.com/centerfoward" target="_blank"><img src="https://img.shields.io/badge/centerfoward-000000?style=for-the-badge&logo=github&logoColor=white"></a>|









