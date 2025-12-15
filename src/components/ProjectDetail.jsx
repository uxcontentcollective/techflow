import { useTranslation } from 'react-i18next';

function ProjectDetail({ project, tasks, teamMembers, onBack }) {
  const { t } = useTranslation('common');

  if (!project) {
    return (
      <div className="project-detail">
        <p>{t('empty.generic')}</p>
      </div>
    );
  }

  const projectTasks = tasks.filter((task) => task.projectId === project.id);
  const projectMembers = teamMembers.filter((m) =>
    project.members.includes(m.id)
  );

  const tasksByStatus = {
    active: projectTasks.filter((t) => t.status === 'active'),
    completed: projectTasks.filter((t) => t.status === 'completed'),
    overdue: projectTasks.filter((t) => t.status === 'overdue'),
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  return (
    <div className="project-detail">
      <div className="project-detail-header">
        <button className="btn-back" onClick={onBack}>
          ← {t('actions.back')}
        </button>
        <div className="project-title-row">
          <h2>{project.name}</h2>
          <span className={`status-badge ${project.status}`}>
            {t(`status.${project.status}`)}
          </span>
        </div>
        <p className="project-description">{project.description}</p>
      </div>

      <div className="project-detail-content">
        <div className="project-section">
          <div className="section-header">
            <h3>Tasks</h3>
            <button className="btn-primary btn-sm">
              + Add Task
            </button>
          </div>

          {projectTasks.length === 0 ? (
            <div className="empty-state">
              <p>{t('empty.tasks')}</p>
            </div>
          ) : (
            <div className="task-list">
              {tasksByStatus.overdue.length > 0 && (
                <div className="task-group">
                  <h4 className="task-group-label overdue">
                    {t('status.overdue')} ({tasksByStatus.overdue.length})
                  </h4>
                  {tasksByStatus.overdue.map((task) => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      members={teamMembers}
                      getPriorityClass={getPriorityClass}
                    />
                  ))}
                </div>
              )}

              {tasksByStatus.active.length > 0 && (
                <div className="task-group">
                  <h4 className="task-group-label active">
                    {t('status.active')} ({tasksByStatus.active.length})
                  </h4>
                  {tasksByStatus.active.map((task) => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      members={teamMembers}
                      getPriorityClass={getPriorityClass}
                    />
                  ))}
                </div>
              )}

              {tasksByStatus.completed.length > 0 && (
                <div className="task-group">
                  <h4 className="task-group-label completed">
                    {t('status.completed')} ({tasksByStatus.completed.length})
                  </h4>
                  {tasksByStatus.completed.map((task) => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      members={teamMembers}
                      getPriorityClass={getPriorityClass}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="project-sidebar">
          <div className="project-section">
            <h3>Team Members</h3>
            {projectMembers.length === 0 ? (
              <p className="empty-text">{t('empty.team')}</p>
            ) : (
              <ul className="member-list">
                {projectMembers.map((member) => (
                  <li key={member.id} className="member-item">
                    <div className="member-avatar">
                      {member.name.charAt(0)}
                    </div>
                    <div className="member-info">
                      <span className="member-name">{member.name}</span>
                      <span className="member-role">{member.role}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="project-section">
            <h3>Project Progress</h3>
            <div className="progress-bar large">
              <div
                className="progress-fill"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <p className="progress-text">
              {project.completedTaskCount} of {project.taskCount} tasks complete ({project.progress}%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskRow({ task, members, getPriorityClass }) {
  const assignee = members.find((m) => m.id === task.assignee);

  return (
    <div className={`task-row ${task.status}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.status === 'completed'}
          readOnly
        />
      </div>
      <div className="task-info">
        <span className={`task-title ${task.status === 'completed' ? 'completed' : ''}`}>
          {task.title}
        </span>
        <div className="task-meta">
          <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
            {task.priority}
          </span>
          {task.dueDate && (
            <span className={`due-date ${task.status === 'overdue' ? 'overdue' : ''}`}>
              Due {task.dueDate}
            </span>
          )}
        </div>
      </div>
      {assignee && (
        <div className="task-assignee">
          <div className="member-avatar small">{assignee.name.charAt(0)}</div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetail;
