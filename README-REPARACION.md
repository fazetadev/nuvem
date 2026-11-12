# NuvemGG V3 - reparación de pantalla en blanco

## Causa corregida
En `src/App.tsx` se utilizaba el icono `LockKeyhole` en la barra superior, pero no estaba importado desde `lucide-react`. Eso provoca un `ReferenceError` al renderizar React y puede dejar la página completamente en blanco.

## Despliegue en Vercel
- Framework: Vite
- Root Directory: `nuvem-main` (si subes la carpeta contenedora del ZIP)
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

No cambies variables de entorno ni credenciales existentes. Después del deploy, abre DevTools > Console si aparece otro error.
