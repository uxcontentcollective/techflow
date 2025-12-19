import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function NotificationBanner() {
  const [dismissed, setDismissed] = useState(false);
  const { t } = useTranslation('notifications');

  if (dismissed) return null;

  return (
    <div className="notification-banner" role="status">
      <p>{t('banner.welcome')}</p>
      <button
        onClick={() => setDismissed(true)}
        aria-label="close"
      >
        Dismiss
      </button>
    </div>
  );
}

export default NotificationBanner;
