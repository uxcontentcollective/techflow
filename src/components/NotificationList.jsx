import { useTranslation } from 'react-i18next';

function NotificationList({ notifications, appState }) {
  const { t } = useTranslation('notifications');
  const { t: tCommon } = useTranslation('common');

  if (appState === 'loading') {
    return (
      <div className="notification-list-page">
        <h2>{tCommon('nav.notifications')}</h2>
        <p className="status-message loading">{tCommon('actions.loading')}</p>
      </div>
    );
  }

  if (appState === 'error') {
    return (
      <div className="notification-list-page">
        <h2>{tCommon('nav.notifications')}</h2>
        <div className="error-state">
          <p className="error-title">{t('error.loadFailed.title')}</p>
          <p className="error-body">{t('error.loadFailed.body')}</p>
          <button className="btn-secondary">{t('error.loadFailed.retry')}</button>
        </div>
      </div>
    );
  }

  if (!notifications || notifications.length === 0) {
    return (
      <div className="notification-list-page">
        <h2>{tCommon('nav.notifications')}</h2>
        <div className="empty-state">
          <p>{tCommon('empty.notifications')}</p>
        </div>
      </div>
    );
  }

  const getNotificationContent = (notification) => {
    const { type, data } = notification;
    const keyPath = type.replace('.', '.');

    const title = t(`${keyPath}.title`, data);
    const body = t(`${keyPath}.body`, data);
    const action = t(`${keyPath}.action`, { defaultValue: '' });

    return { title, body, action };
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return tCommon('time.justNow');
    if (diffHours < 24) return tCommon('time.hoursAgo', { count: diffHours });
    if (diffDays < 7) return tCommon('time.daysAgo', { count: diffDays });
    return date.toLocaleDateString();
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="notification-list-page">
      <div className="notification-list-header">
        <h2>{tCommon('nav.notifications')}</h2>
        {unreadCount > 0 && (
          <span className="unread-badge">{unreadCount} unread</span>
        )}
      </div>

      <ul className="notification-list">
        {notifications.map((notification) => {
          const { title, body, action } = getNotificationContent(notification);
          return (
            <li
              key={notification.id}
              className={`notification-item ${notification.read ? 'read' : 'unread'}`}
            >
              <div className="notification-content">
                <p className="notification-title">{title}</p>
                <p className="notification-body">{body}</p>
                <span className="notification-time">
                  {formatTime(notification.timestamp)}
                </span>
              </div>
              {action && (
                <button className="notification-action btn-link">
                  {action}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NotificationList;
