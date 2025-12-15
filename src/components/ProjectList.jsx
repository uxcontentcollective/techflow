import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function ProjectList({ projects, onSelectProject, appState }) {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  if (appState === 'loading') {
    return (
      <div className="project-list-page">
        <h2>{t('nav.projects')}</h2>
        <p className="status-message loading">{t('actions.loading')}</p>
      </div>
    );
  }

  if (appState === 'error') {
    return (
      <div className="project-list-page">
        <h2>{t('nav.projects')}</h2>
        <p className="status-message error">Something went wrong loading your projects. Please try again.</p>
      </div>
    );
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="project-list-page">
      <div className="project-list-header">
        <h2>{t('nav.projects')}</h2>
        <button className="btn-primary">
          {t('actions.create')} Project
        </button>
      </div>

      <div className="project-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder={t('actions.search') + '...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-group">
          <label>{t('actions.filter')}:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="active">{t('status.active')}</option>
            <option value="completed">{t('status.completed')}</option>
            <option value="archived">{t('status.archived')}</option>
          </select>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="empty-state">
          <p>
            {searchTerm || statusFilter !== 'all'
              ? t('empty.search')
              : t('empty.projects')}
          </p>
        </div>
      ) : (
        <div className="project-table">
          <div className="table-header">
            <span className="col-name">Name</span>
            <span className="col-status">Status</span>
            <span className="col-progress">Progress</span>
            <span className="col-updated">Last Updated</span>
            <span className="col-members">Team</span>
          </div>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="table-row"
              onClick={() => onSelectProject(project.id)}
            >
              <span className="col-name">
                <strong>{project.name}</strong>
                <small>{project.description.slice(0, 60)}...</small>
              </span>
              <span className="col-status">
                <span className={`status-badge ${project.status}`}>
                  {t(`status.${project.status}`)}
                </span>
              </span>
              <span className="col-progress">
                <div className="progress-bar small">
                  <div
                    className="progress-fill"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <small>{project.progress}%</small>
              </span>
              <span className="col-updated">{formatDate(project.lastUpdated)}</span>
              <span className="col-members">
                {project.members.length} members
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectList;
