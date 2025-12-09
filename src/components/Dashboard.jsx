import { useTranslation } from 'react-i18next';
import NotificationBanner from './NotificationBanner';
import StatusMessage from './StatusMessage';

function Dashboard({ user, projects, activities, appState }) {
  const { t } = useTranslation('common');

  if (appState === 'loading' || appState === 'error' || appState === 'empty') {
    return (
      <div className="dashboard">
        <NotificationBanner />
        <StatusMessage status={appState} />
      </div>
    );
  }

  const activeProjects = projects.filter((p) => p.status === 'active');
  const totalTasks = projects.reduce((sum, p) => sum + p.taskCount, 0);
  const completedTasks = projects.reduce((sum, p) => sum + p.completedTaskCount, 0);

  return (
    <div className="dashboard">
      <NotificationBanner />

      <div className="dashboard-header">
        <h2>Welcome back, {user.name}</h2>
        <p className="dashboard-date">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{activeProjects.length}</div>
          <div className="stat-label">Active Projects</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalTasks - completedTasks}</div>
          <div className="stat-label">Pending Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{completedTasks}</div>
          <div className="stat-label">Completed Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{projects.length}</div>
          <div className="stat-label">Total Projects</div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h3>Active Projects</h3>
          <div className="project-cards">
            {activeProjects.slice(0, 3).map((project) => (
              <div key={project.id} className="project-card-small">
                <div className="project-card-header">
                  <h4>{project.name}</h4>
                  <span className={`status-badge ${project.status}`}>
                    {t(`status.${project.status}`)}
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <p className="progress-text">
                  {project.completedTaskCount} of {project.taskCount} tasks complete
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h3>Recent Activity</h3>
          <ul className="activity-list">
            {activities.map((activity) => (
              <li key={activity.id} className="activity-item">
                <span className="activity-text">{activity.text}</span>
                <span className="activity-time">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
