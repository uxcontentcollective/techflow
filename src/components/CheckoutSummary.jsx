import { useTranslation } from 'react-i18next';

function CheckoutSummary({ items, total, formatCurrency }) {
  const { t } = useTranslation('checkout');

  return (
    <div className="checkout-summary">
      <h2>{t('title')}</h2>
      <p>Review your order before completing purchase.</p>

      <div className="items">
        {items.map(item => (
          <div key={item.id} className="item-row">
            <span>{item.name}</span>
            <span>{formatCurrency(item.price)}</span>
          </div>
        ))}
      </div>

      <div className="total">
        <span>Total:</span>
        <span>{formatCurrency(total)}</span>
      </div>

      <button className="checkout-button">
        {t('button.submit')}
      </button>

      <p className="terms">
        By completing this purchase, you agree to our Terms of Service.
      </p>
    </div>
  );
}

export default CheckoutSummary;
