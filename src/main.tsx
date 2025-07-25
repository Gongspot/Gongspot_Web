import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SearchModeProvider } from './contexts/SearchModeContext' // 경로는 위치에 따라 조정

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
      <SearchModeProvider>
        <App />
      </SearchModeProvider>
  </>,
)
