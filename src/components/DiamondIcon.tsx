import React, { useEffect, useState } from 'react';
import { IMAGES } from '../config/images';

// Quita el fondo de la imagen del diamante (el color de las esquinas) y la devuelve con transparencia.
const cache = new Map<string, Promise<string>>();

function loadTransparent(src: string): Promise<string> {
  const hit = cache.get(src);
  if (hit) return hit;
  const p = new Promise<string>((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const w = img.naturalWidth, h = img.naturalHeight;
        const c = document.createElement('canvas');
        c.width = w; c.height = h;
        const ctx = c.getContext('2d', { willReadFrequently: true })!;
        ctx.drawImage(img, 0, 0);
        const d = ctx.getImageData(0, 0, w, h);
        const px = d.data;
        // color de fondo = promedio de las 4 esquinas
        const corners = [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]].map(([x, y]) => {
          const i = (y * w + x) * 4;
          return [px[i], px[i + 1], px[i + 2]];
        });
        const bg = [0, 1, 2].map((k) => corners.reduce((a, c) => a + c[k], 0) / 4);
        const dist = (i: number) =>
          Math.hypot(px[i] - bg[0], px[i + 1] - bg[1], px[i + 2] - bg[2]);
        const LOW = 38, HIGH = 80; // por debajo: transparente; entre medio: borde suave
        // flood fill desde los bordes para no borrar zonas internas del diamante
        const seen = new Uint8Array(w * h);
        const stack: number[] = [];
        const push = (x: number, y: number) => {
          const p = y * w + x;
          if (!seen[p] && dist(p * 4) < HIGH) { seen[p] = 1; stack.push(p); }
        };
        for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
        for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }
        while (stack.length) {
          const p = stack.pop()!;
          const x = p % w, y = (p / w) | 0;
          const dd = dist(p * 4);
          px[p * 4 + 3] = dd < LOW ? 0 : Math.round(((dd - LOW) / (HIGH - LOW)) * 255);
          if (x > 0) push(x - 1, y);
          if (x < w - 1) push(x + 1, y);
          if (y > 0) push(x, y - 1);
          if (y < h - 1) push(x, y + 1);
        }
        ctx.putImageData(d, 0, 0);
        resolve(c.toDataURL('image/png'));
      } catch {
        resolve(src); // si el navegador bloquea el canvas, usa la imagen original
      }
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
  cache.set(src, p);
  return p;
}

export const DiamondIcon: React.FC<{ className?: string; src?: string; alt?: string }> = ({
  className = 'w-5 h-5',
  src: source = IMAGES.diamond,
  alt = 'Diamantes',
}) => {
  const [src, setSrc] = useState<string>(source);
  useEffect(() => {
    let alive = true;
    setSrc(source);
    // Solo si es un JPG sin transparencia intentamos quitar fondo
    if (source.endsWith('.jpg') || source.endsWith('.jpeg')) {
      loadTransparent(source).then((s) => alive && setSrc(s));
    }
    return () => { alive = false; };
  }, [source]);
  const glow = 'sm:drop-shadow-[0_0_8px_rgba(56,189,248,0.82)]';
  return <img src={src} alt={alt} loading="lazy" decoding="async" className={`${className} object-contain ${glow}`} />;
};
