import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CheckoutSummary from './CheckoutSummary';

function UpgradeFlow({ currentPlan, appState }) {
  const { t } = useTranslation('checkout');
  const { t: tErrors } = useTranslation('errors');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [step, setStep] = useState('plans');
  const [errorType, setErrorType] = useState(null);

  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

  if (appState === 'error') {
    return (
      <div className="upgrade-flow">
        <h2>{t('title')}</h2>
        <div className="error-state">
          <p>{tErrors('network.serverError')}</p>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="upgrade-flow">
        <div className="success-state">
          <div className="success-icon">✓</div>
          <h2>{t('success.title')}</h2>
          <p>{t('success.body', { planName: selectedPlan })}</p>
          <button className="btn-primary" onClick={() => setStep('plans')}>
            {t('success.cta')}
          </button>
        </div>
      </div>
    );
  }

  if (step === 'checkout') {
    return (
      <div className="upgrade-flow">
        <button className="btn-back" onClick={() => setStep('plans')}>
          ← {t('button.back')}
        </button>

        <div className="checkout-layout">
          <div className="checkout-form-section">
            <h2>{t('title')}</h2>
            <p className="checkout-subtitle">{t('subtitle')}</p>

            {errorType && (
              <div className="error-banner">
                <p>{tErrors(`payment.${errorType}`)}</p>
              </div>
            )}

            <div className="checkout-form">
              <div className="form-group">
                <label>{t('form.nameOnCard')}</label>
                <input type="text" placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>{t('form.cardNumber')}</label>
                <input type="text" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{t('form.expiry')}</label>
                  <input type="text" placeholder="MM/YY" />
                </div>
                <div className="form-group">
                  <label>{t('form.cvv')}</label>
                  <input type="text" placeholder="123" />
                </div>
              </div>

              <label className="checkbox-label terms-checkbox">
                <input type="checkbox" />
                {t('terms')}
              </label>

              <button
                className="btn-primary btn-full"
                onClick={() => setStep('success')}
              >
                {t('button.submit')}
              </button>
            </div>

            <div className="error-test-buttons">
              <p className="helper-text">Test payment errors:</p>
              <div className="error-btn-group">
                <button
                  className="btn-sm btn-outline"
                  onClick={() => setErrorType('declined')}
                >
                  Declined
                </button>
                <button
                  className="btn-sm btn-outline"
                  onClick={() => setErrorType('expired')}
                >
                  Expired
                </button>
                <button
                  className="btn-sm btn-outline"
                  onClick={() => setErrorType('insufficient')}
                >
                  Insufficient
                </button>
                <button
                  className="btn-sm btn-outline"
                  onClick={() => setErrorType('timeout')}
                >
                  Timeout
                </button>
                <button
                  className="btn-sm btn-outline"
                  onClick={() => setErrorType('generic')}
                >
                  Generic
                </button>
                <button
                  className="btn-sm btn-outline"
                  onClick={() => setErrorType(null)}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          <CheckoutSummary
            items={[
              { id: 'plan', name: `${selectedPlan} Plan`, price: selectedPlan === 'Pro' ? 12 : 49 },
            ]}
            total={selectedPlan === 'Pro' ? 12 : 49}
            formatCurrency={formatCurrency}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="upgrade-flow">
      <div className="upgrade-header">
        <h2>{t('title')}</h2>
        <p>{t('subtitle')}</p>
      </div>

      <div className="plan-cards">
        <div className={`plan-card ${currentPlan === 'free' ? 'current' : ''}`}>
          <h3>{t('plan.free.name')}</h3>
          <div className="plan-price">{t('plan.free.price')}</div>
          <p className="plan-description">{t('plan.free.description')}</p>
          <ul className="plan-features">
            <li>{t('plan.free.features.projects')}</li>
            <li>{t('plan.free.features.members')}</li>
            <li>{t('plan.free.features.storage')}</li>
          </ul>
          {currentPlan === 'free' && (
            <span className="current-plan-badge">{t('comparison.currentPlan')}</span>
          )}
        </div>

        <div className="plan-card recommended">
          <span className="recommended-badge">{t('comparison.recommended')}</span>
          <h3>{t('plan.pro.name')}</h3>
          <div className="plan-price">{t('plan.pro.price', { price: '12' })}</div>
          <p className="plan-description">{t('plan.pro.description')}</p>
          <ul className="plan-features">
            <li>{t('plan.pro.features.projects')}</li>
            <li>{t('plan.pro.features.members')}</li>
            <li>{t('plan.pro.features.storage')}</li>
            <li>{t('plan.pro.features.analytics')}</li>
            <li>{t('plan.pro.features.support')}</li>
          </ul>
          <button
            className="btn-primary btn-full"
            onClick={() => {
              setSelectedPlan('Pro');
              setStep('checkout');
            }}
          >
            {t('button.submit')}
          </button>
        </div>

        <div className="plan-card">
          <h3>{t('plan.enterprise.name')}</h3>
          <div className="plan-price">{t('plan.enterprise.price')}</div>
          <p className="plan-description">{t('plan.enterprise.description')}</p>
          <ul className="plan-features">
            <li>{t('plan.enterprise.features.projects')}</li>
            <li>{t('plan.enterprise.features.members')}</li>
            <li>{t('plan.enterprise.features.storage')}</li>
            <li>{t('plan.enterprise.features.analytics')}</li>
            <li>{t('plan.enterprise.features.support')}</li>
            <li>{t('plan.enterprise.features.sso')}</li>
            <li>{t('plan.enterprise.features.audit')}</li>
          </ul>
          <button
            className="btn-secondary btn-full"
            onClick={() => {
              setSelectedPlan('Enterprise');
              setStep('checkout');
            }}
          >
            {t('button.contact')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpgradeFlow;
