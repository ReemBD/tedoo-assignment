import { FeedIndex } from './modules/feed/pages/feed/feed-index.component';
import "./assets/styles/main.scss"
import { AppHeader } from './modules/core/components/app-header/app-header.component';

function App() {

  return (
    <main className="main-layout">
      <AppHeader />
      <FeedIndex />
    </main>
  );
}

export default App;
