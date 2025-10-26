# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Commit Message Convention

이 프로젝트는 다음과 같은 커밋 메시지 컨벤션을 따릅니다:

| 타입 | 의미 | 예시 |
|------|------|------|
| **feat** | 새로운 기능 추가 | `[feat] 로그인 기능 추가` |
| **fix** | 버그 수정 | `[fix] 이미지 로드 에러 수정` |
| **docs** | 문서 수정 (README 등) | `[docs] README 설치 가이드 추가` |
| **style** | 코드 포맷, 세미콜론 등 비기능적 수정 | `[style] prettier 적용` |
| **refactor** | 코드 리팩토링 (기능 변화 없음) | `[refactor] 컴포넌트 구조 단순화` |
| **perf** | 성능 개선 | `[perf] 렌더링 최적화` |
| **test** | 테스트 코드 추가/수정 | `[test] 유닛 테스트 추가` |
| **chore** | 빌드, 패키지, 환경설정 등 기타 잡무 | `[chore] eslint 설정 업데이트` |
| **build** | 빌드 관련 파일 변경 | `[build] webpack 버전 업그레이드` |
| **ci** | CI 설정 관련 변경 (GitHub Actions, Jenkins 등) | `[ci] 테스트 워크플로 수정` |
| **init** | 프로젝트 초기 세팅 | `[init] 프로젝트 초기화` |
| **update** | 단순 업데이트(스타일, UI 변경 등) | `[update] 페이지 배경색 변경` |
| **rename** | 파일명 변경 | `[rename] components → ui로 변경` |
| **remove** | 파일/코드 삭제 | `[remove] 불필요한 로그 제거` |
| **merge** | 브랜치 병합 | `[merge] feature/login 병합` |
| **hotfix** | 긴급 버그 수정 | `[hotfix] 프로덕션 빌드 오류 수정` |

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
