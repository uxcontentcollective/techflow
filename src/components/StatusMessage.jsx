function StatusMessage({ status }) {
  if (status === 'loading') {
    return <p className="status-message loading">Loading your data!</p>;
  }
  if (status === 'error') {
    return <p className="status-message error">Something went wrong. Please try again.</p>;
  }
  if (status === 'empty') {
    return <p className="status-message empty">No results found. Try adjusting your search.</p>;
  }
  return <p className="status-message success">Your data is ready.</p>;
}

export default StatusMessage;
