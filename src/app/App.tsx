import { BrowserRouter, Routes } from 'react-router-dom';
import { MockSessionProvider } from '../mock/session';
import { MockStoreProvider } from '../mock/store';
import { productRoutes } from './productRouter';
import { liveRoutes } from './router';

export function App() {
  return (
    <BrowserRouter>
      <MockSessionProvider>
        <MockStoreProvider>
          <Routes>
            {productRoutes()}
            {liveRoutes()}
          </Routes>
        </MockStoreProvider>
      </MockSessionProvider>
    </BrowserRouter>
  );
}
