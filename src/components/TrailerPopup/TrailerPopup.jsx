import { useEffect } from 'react';
import './TrailerPopup.css';

export default function TrailerPopup({
  trailerLink,
  onClose,
  isTrailerOpen,
  mobileWidth,
}) {
  useEffect(() => {
    if (!isTrailerOpen) return;

    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isTrailerOpen, onClose, trailerLink]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const convertLinktoEmbed = (link) => {
    return link.replace(/watch\?v=/g, 'embed/');
  };

  return (
    <div className='trailer-popup' onClick={handleOverlay}>
      <div className='trailer-popup__wrapper'>
        <button
          className={
            !mobileWidth
              ? 'trailer-popup__close-button'
              : 'trailer-popup__close-button trailer-popup__close-button_mobile'
          }
          onClick={onClose}
        ></button>
        <iframe
          title='trailer-popup__frame'
          width={mobileWidth ? 310 : 555}
          height={mobileWidth ? 220 : 320}
          src={convertLinktoEmbed(trailerLink)}
          frameBorder='0'
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
