import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { configure } from 'mobx';
import { App } from '@app/App';

async function bootstrap() {
  if (import.meta.env.DEV) {
    const { worker } = await import('@shared/mocks/browser');
    await worker.start();
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
configure({
  enforceActions: 'always',
});

bootstrap();
