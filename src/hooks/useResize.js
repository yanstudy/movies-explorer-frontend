import { useEffect, useState } from 'react';

export const useResize = () => {
  const [isDesktopWidth, setDesktopWidth] = useState(false);
  const [isAverageWidth, setAverageWidth] = useState(false);
  const [isMobileWidth, setMobileWidth] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;

      if (newWidth >= 1060) {
        setDesktopWidth(true);
        setAverageWidth(false);
        setMobileWidth(false);
      } else if (newWidth <= 1060 && newWidth > 555) {
        setDesktopWidth(false);
        setAverageWidth(true);
        setMobileWidth(false);
      } else if (newWidth <= 555) {
        setDesktopWidth(false);
        setAverageWidth(false);
        setMobileWidth(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isDesktopWidth, isAverageWidth, isMobileWidth };
};
