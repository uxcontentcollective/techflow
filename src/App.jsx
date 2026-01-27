import { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import NotificationList from './components/NotificationList';
import SettingsPanel from './components/SettingsPanel';
import UpgradeFlow from './components/UpgradeFlow';
import OnboardingFlow from './components/OnboardingFlow';
import DebugPanel from './components/DebugPanel';
import {
  currentUser,
  projects,
  tasks,
  teamMembers,
  notifications,
  activityFeed,
} from './mockData';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [appState, setAppState] = useState('populated');
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedProjectId(null);
  };

  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
    setCurrentPage('project-detail');
  };

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const renderPage = () => {
    if (showOnboarding) {
      return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            user={currentUser}
            projects={projects}
            activities={activityFeed}
            appState={appState}
          />
        );
      case 'projects':
        return (
          <ProjectList
            projects={projects}
            onSelectProject={handleSelectProject}
            appState={appState}
          />
        );
      case 'project-detail':
        return (
          <ProjectDetail
            project={selectedProject}
            tasks={tasks}
            teamMembers={teamMembers}
            onBack={() => setCurrentPage('projects')}
          />
        );
      case 'notifications':
        return (
          <NotificationList
            notifications={notifications}
            appState={appState}
          />
        );
      case 'settings':
        return (
          <SettingsPanel
            user={currentUser}
            onSave={() => alert('Settings saved')}
            onCancel={() => setCurrentPage('dashboard')}
          />
        );
      case 'upgrade':
        return (
          <UpgradeFlow
            currentPlan={currentUser.plan}
            appState={appState}
          />
        );
      default:
        return (
          <Dashboard
            user={currentUser}
            projects={projects}
            activities={activityFeed}
            appState={appState}
          />
        );
    }
  };

  return (
    <div className="app">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="main-content">
        {renderPage()}
      </main>
      <DebugPanel appState={appState} onStateChange={setAppState} />
      {!showOnboarding && (
        <button
          className="onboarding-trigger"
          onClick={() => setShowOnboarding(true)}
          title="View onboarding flow"
        >
          Onboarding
        </button>
      )}
    </div>
  );
}

export default App;
