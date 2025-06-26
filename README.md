#  Gongspot_Web

> Gongspot 웹 프론트엔드 프로젝트 레포지토리입니다.

## 🛠️ 기술 스택 (Tech Stack)

- **Framework**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Package Manager**: pnpm


### 🌐 Git-flow 전략 (Git-flow Strategy)

- **`main`**: 최종적으로 사용자에게 배포되는 가장 안정적인 버전의 브랜치입니다.
- **`develop`**: 다음 출시 버전을 개발하는 중심 브랜치입니다. 기능 개발이 완료되면 `feature` 브랜치들이 이곳으로 병합(merge)됩니다.
- **`feature`**: 각각의 기능을 개발하는 브랜치입니다. `develop` 브랜치에서 분기하여 작업합니다.

### 📌 브랜치 규칙 및 네이밍 (Branch Rules & Naming)

1.  모든 기능 개발은 **`feature`** 브랜치에서 시작합니다.
2.  작업 시작 전, 항상 최신 `develop` 브랜치의 내용을 받아옵니다 (`git pull origin develop`).
3.  작업이 완료되면, `develop` 브랜치로 **Pull Request(PR)**를 생성하여 코드 리뷰를 요청합니다.
4.  PR에는 반드시 한 명 이상의 팀원(Reviewer)을 지정하고, **Approve**를 받아야 병합할 수 있습니다.
5.  PR 생성 후, 팀원들에게 리뷰를 요청했다고 알립니다.

**브랜치 이름 형식:** `feature/이름-기능제목#이슈번호`
- **예시:** `feature/wondy-login#1`

### 🎯 커밋 컨벤션 (Commit Convention)

커밋 메시지는 아래의 형식을 따르며, **제목은 모두 소문자, 현재형 동사**로 작성합니다.

| Gitmoji | Prefix    | 설명                                              |
| :-----: | :-------- | :------------------------------------------------ |
|    🎉    | `start`   | 새로운 프로젝트를 시작할 때                       |
|    ✨    | `feat`    | 새로운 기능을 추가할 때                           |
|    🐛    | `fix`     | 버그를 수정할 때                                  |
|    🎨    | `design`  | CSS 등 사용자 UI 디자인을 변경할 때               |
|    ♻️    | `refactor`| 기능 변경 없이 코드를 리팩토링할 때               |
|    🔧    | `settings`| 설정 파일을 변경할 때                             |
|    🗃️    | `comment` | 필요한 주석을 추가하거나 변경할 때                |
|    ➕    | `dependency/Plugin` | 의존성/플러그인을 추가할 때               |
|    📝    | `docs`    | README.md 등 문서를 수정할 때                     |
|    🔀    | `merge`   | 브랜치를 병합할 때                                |
|    🚀    | `deploy`  | 빌드 및 배포 관련 작업을 할 때                    |
|    🚚    | `rename`  | 파일 혹은 폴더명을 수정하거나 옮길 때             |
|    🔥    | `remove`  | 파일을 삭제하는 작업만 수행했을 때                |
|    ⏪️    | `revert`  | 이전 버전으로 롤백할 때                           |