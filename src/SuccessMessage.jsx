const SuccessMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="toast-overlay">
      <div className="success-toast">
        <div className="toast-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="10"
              cy="10"
              r="9"
              stroke="white"
              strokeWidth="2"
            />
            <path
              d="M6 10L9 13L14 7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="toast-content">
          <h4>Message sent!</h4>
          <p className="toast-text">
            Thanks for completing the form. We'll be in touch soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
