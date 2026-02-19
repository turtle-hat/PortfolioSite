import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import Homepage from './Homepage'

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Homepage/>
    </StrictMode>
);
