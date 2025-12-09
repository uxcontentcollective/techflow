import { useTranslation } from 'react-i18next';

function Navigation({ currentPage, onNavigate }) {
  const { t, i18n } = useTranslation('common');

  const navItems = [
    { key: 'dashboard', icon: '📊' },
    { key: 'projects', icon: '📁' },
    { key: 'notifications', icon: '🔔' },
    { key: 'settings', icon: '⚙️' },
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'de' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">TechFlow</h1>
      </div>

      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.key}>
            <button
              className={`nav-item ${currentPage === item.key ? 'active' : ''}`}
              onClick={() => onNavigate(item.key)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{t(`nav.${item.key}`)}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="nav-bottom">
        <button
          className="nav-item upgrade-btn"
          onClick={() => onNavigate('upgrade')}
        >
          <span className="nav-icon">⭐</span>
          <span className="nav-label">{t('nav.upgrade')}</span>
        </button>

        <div className="language-switcher">
          <button onClick={toggleLanguage} className="lang-toggle">
            {i18n.language === 'en' ? '🇩🇪 Deutsch' : '🇺🇸 English'}
          </button>
        </div>

        <button className="nav-item sign-out" onClick={() => {}}>
          <span className="nav-icon">🚪</span>
          <span className="nav-label">{t('nav.signOut')}</span>
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
