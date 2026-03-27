import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

export function ScreenshotTaker() {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'p' || event.key === 'P') {
        console.log(' Tirando screenshot...');

        gl.render(scene, camera);

        const screenshotUrl = gl.domElement.toDataURL('image/png');

        const link = document.createElement('a');
        link.setAttribute('download', 'meu-asset-3d.png');
        link.setAttribute('href', screenshotUrl);
        link.click();

        console.log('✅ Screenshot salvo na sua pasta de downloads!');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gl, scene, camera]);

  return null;
}