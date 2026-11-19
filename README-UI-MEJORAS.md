# Mejoras de interfaz y responsive

- El checkout ahora entra con una transición de opacidad, sin desplazamiento vertical interno que provocaba el salto visual en móvil.
- El desplazamiento al checkout y al catálogo respeta `prefers-reduced-motion` y tiene márgenes de anclaje para cabeceras móviles.
- Se reorganizó el historial de pedidos con pestañas Todos, Pendientes y Completados, contadores y orden cronológico (más recientes primero).
- Se ajustaron tarjetas, campos, métodos de pago, resumen y progreso para pantallas pequeñas; se añadieron reglas para anchos de 370 px o menos.
- El método de pago ya no aparece seleccionado automáticamente: el comprador debe elegirlo.
- Se limitó el desbordamiento horizontal y se adaptó el modal de consulta a la altura dinámica del móvil.

La comprobación de sintaxis TSX de los archivos modificados pasó. No se pudo ejecutar el build completo porque las dependencias del proyecto no estaban instaladas y la instalación de npm agotó el tiempo disponible en este entorno.
