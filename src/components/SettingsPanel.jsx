import { useTranslation } from 'react-i18next';

function SettingsPanel({ user, onSave, onCancel }) {
  const { t } = useTranslation('settings');

  return (
    <div className="settings-panel">
      <h2>{t('title')}</h2>
      <p>Manage your account preferences and personal information.</p>

      <div className="settings-section">
        <h3>{t('profile.heading')}</h3>
        <div className="form-group">
          <label>{t('profile.displayName')}</label>
          <input type="text" defaultValue={user.name} />
          <p className="helper-text">{t('profile.helper')}</p>
        </div>
        <div className="form-group">
          <label>{t('profile.email')}</label>
          <input type="email" defaultValue={user.email} />
        </div>
      </div>

      <div className="settings-section">
        <h3>{t('notifications.heading')}</h3>
        <label className="checkbox-label">
          <input type="checkbox" defaultChecked={user.emailNotifications} />
          {t('notifications.emailUpdates')}
        </label>
        <label className="checkbox-label">
          <input type="checkbox" defaultChecked={user.marketingEmails} />
          {t('notifications.marketing')}
        </label>
      </div>

      <div className="settings-section danger-section">
        <h3>Danger Zone</h3>
        <p>Once you delete your account, there is no going back. Please be certain.</p>
        <button className="btn-danger">Delete my account</button>
      </div>

      <div className="button-group">
        <button className="btn-secondary" onClick={onCancel}>{t('button.cancel')}</button>
        <button className="btn-primary" onClick={onSave}>{t('button.save')}</button>
      </div>
    </div>
  );
}

export default SettingsPanel;
