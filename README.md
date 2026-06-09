# ETFViewer
Finance ETF Search AND Viewer

# ETFnow Dashboard

ETFnow API를 Cloudflare Worker로 중계해서 모바일/PC 브라우저에서 ETF 기본정보와 구성종목을 보는 간단한 대시보드입니다.

## 파일 구성

| 파일 | 역할 |
|---|---|
| `index.html` | GitHub Pages에 올릴 모바일 웹페이지 |
| `worker.js` | Cloudflare Worker 중계 API |
| `README.md` | 배포 설명 |

## 구현된 기능

- ETF 코드 추가
- ETF 삭제
- ETF 목록 localStorage 저장
- 전체 새로고침
- 개별 새로고침
- ETF 기본정보 표기
- 구성종목 전체 표기
- JSON 내보내기
- 모바일 화면 대응

## 사용하는 ETFnow API

Worker가 아래 두 API를 호출합니다.

```text
https://etfnow.co.kr/api/etf/{code}/basic
https://etfnow.co.kr/api/etf/{code}/holdings
```

## 1. Cloudflare Worker 배포

1. Cloudflare 접속
2. Workers & Pages
3. Create Worker
4. `worker.js` 내용을 붙여넣기
5. Deploy
6. 생성된 Worker URL 복사

예시:

```text
https://etfnow-proxy.example.workers.dev
```

## 2. GitHub Pages 배포

1. GitHub에 새 Repository 생성
2. `index.html`, `README.md` 업로드
3. Repository Settings
4. Pages
5. Branch를 `main` / root로 설정
6. 배포된 Pages URL 접속

## 3. 사용 방법

1. GitHub Pages로 열린 대시보드 접속
2. 상단 Worker URL 입력
3. 저장 클릭
4. ETF 코드 입력 후 추가

예시 코드:

```text
0167A0
```

## 주의사항

- ETFnow API 응답 구조가 바뀌면 화면 일부가 깨질 수 있습니다.
- Worker에서 ETFnow 요청이 막히면 조회가 실패할 수 있습니다.
- 즐겨찾기 API(`/api/v1/favorites`)는 device token이 필요해서 사용하지 않았습니다.
- Google Analytics 요청은 추적용이라 사용하지 않았습니다.
