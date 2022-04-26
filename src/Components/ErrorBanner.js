import './errorBanner.css';

export const ErrorBanner = ({errors, clearError}) =>
  Object.keys(errors).length > 0 && (
    <div className="errorBanner">
      {Object.entries(errors).map(([key, err]) => (
        <div key={key}>
          {err} <a onClick={() => clearError(key)}>[x]</a>
        </div>
      ))}
    </div>
  );
