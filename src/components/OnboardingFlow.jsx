import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function OnboardingFlow({ onComplete }) {
  const { t } = useTranslation('onboarding');
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    projectName: '',
    projectDescription: '',
    emails: [''],
  });

  const steps = ['profile', 'project', 'invite'];
  const totalSteps = steps.length;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addEmailField = () => {
    setFormData({ ...formData, emails: [...formData.emails, ''] });
  };

  if (currentStep >= totalSteps) {
    return (
      <div className="onboarding">
        <div className="onboarding-card completion">
          <div className="completion-icon">🎉</div>
          <h2>{t('completion.title')}</h2>
          <p>{t('completion.description')}</p>
          <button className="btn-primary" onClick={onComplete}>
            {t('completion.cta')}
          </button>
        </div>
      </div>
    );
  }

  const stepKey = steps[currentStep];

  return (
    <div className="onboarding">
      <div className="onboarding-card">
        {currentStep === 0 && (
          <div className="onboarding-welcome">
            <h1>{t('welcome.title')}</h1>
            <p>{t('welcome.subtitle')}</p>
          </div>
        )}

        <div className="onboarding-progress">
          <span className="step-indicator">
            {t('progress.step', { current: currentStep + 1, total: totalSteps })}
          </span>
          <div className="progress-dots">
            {steps.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}
              />
            ))}
          </div>
        </div>

        <div className="onboarding-step">
          <h2>{t(`steps.${stepKey}.title`)}</h2>
          <p>{t(`steps.${stepKey}.description`)}</p>

          {stepKey === 'profile' && (
            <div className="onboarding-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder={t('steps.profile.placeholder.name')}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder={t('steps.profile.placeholder.role')}
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {stepKey === 'project' && (
            <div className="onboarding-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder={t('steps.project.placeholder.name')}
                  value={formData.projectName}
                  onChange={(e) =>
                    setFormData({ ...formData, projectName: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder={t('steps.project.placeholder.description')}
                  value={formData.projectDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      projectDescription: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}

          {stepKey === 'invite' && (
            <div className="onboarding-form">
              {formData.emails.map((email, idx) => (
                <div className="form-group" key={idx}>
                  <input
                    type="email"
                    placeholder={t('steps.invite.placeholder.email')}
                    value={email}
                    onChange={(e) => {
                      const newEmails = [...formData.emails];
                      newEmails[idx] = e.target.value;
                      setFormData({ ...formData, emails: newEmails });
                    }}
                  />
                </div>
              ))}
              <button className="btn-link" onClick={addEmailField}>
                + {t('steps.invite.addAnother')}
              </button>
            </div>
          )}
        </div>

        <div className="onboarding-actions">
          {currentStep > 0 && (
            <button className="btn-secondary" onClick={handleBack}>
              {t('progress.back')}
            </button>
          )}
          <button className="btn-link" onClick={handleNext}>
            {t('progress.skip')}
          </button>
          <button className="btn-primary" onClick={handleNext}>
            {currentStep < totalSteps - 1
              ? t('progress.next')
              : t('completion.cta')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnboardingFlow;
