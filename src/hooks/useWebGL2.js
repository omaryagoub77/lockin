import { useEffect, useState } from 'react';

export default function useWebGL2() {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    let canvas;
    try {
      canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2', {
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      });
      setSupported(Boolean(gl));
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
