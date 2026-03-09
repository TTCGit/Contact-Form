import { useState } from "react";
import "./App.css";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [queryType, setQueryType] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    message: "",
    consent: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const validateName = (name, fieldName) => {
    if (!name.trim()) return `${fieldName} is required`;

    if (name.trim().length < 2) {
      return `${fieldName} must be at least 2 characters`;
    }
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) return "Please enter a valid email address";

    return "";
  };

  const validateQueryType = (queryType) => {
    if (!queryType) return "Please select a query type";

    return "";
  };

  const validateMessage = (message) => {
    if (!message.trim()) return "Please leave a message";

    if (message.trim().length < 10)
      return "Message must be at least 10 characters";

    return "";
  };

  const validateConsent = (consent) => {
    if (!consent) return "You must consent to being contacted";

    return "";
  };

  const clearError = (fieldName) => {
    setErrors({
      ...errors,
      [fieldName]: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const firstNameError = validateName(firstName, "First name");
    const lastNameError = validateName(lastName, "Last name");
    const emailError = validateEmail(email);
    const queryTypeError = validateQueryType(queryType);
    const messageError = validateMessage(message);
    const consentError = validateConsent(consent);

    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      queryTypeError ||
      messageError ||
      consentError
    ) {
      setErrors({
        firstName: firstNameError,
        lastName: lastNameError,
        email: emailError,
        queryType: queryTypeError,
        message: messageError,
        consent: consentError,
      });

      return;
    }

    setSuccessMessage("success");

    setFirstName("");
    setLastName("");
    setEmail("");
    setQueryType("");
    setMessage("");
    setConsent(false);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="app-container">
      <SuccessMessage message={successMessage} />
      <form
        className="contact-form"
        onSubmit={onSubmit}>
        <h3 className="form-title">Contact Us</h3>

        <div className="form-grid">
          <div>
            <label
              htmlFor="first name"
              className="form-label">
              First name*
            </label>
            <input
              type="text"
              name="firstName"
              className="form-input"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                clearError("firstName");
              }}
            />
            <ErrorMessage error={errors.firstName} />
          </div>
          <div>
            <label
              htmlFor="last name"
              className="form-label">
              Last name*
            </label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              className="form-input"
              onChange={(e) => {
                setLastName(e.target.value);
                clearError("lastName");
              }}
            />
            <ErrorMessage error={errors.lastName} />
          </div>
        </div>

        <div className="form-group">
          <label
            htmlFor="email"
            className="form-label">
            Email*
          </label>
          <input
            type="email"
            name="email"
            value={email}
            className="form-input"
            onChange={(e) => {
              setEmail(e.target.value);
              clearError("email");
            }}
          />
          <ErrorMessage error={errors.email} />
        </div>

        <div className="form-group">
          <div className="query-label-wrapper">
            <label
              htmlFor="query type"
              className="form-label">
              Query Type*
            </label>
          </div>
          <div className="radio-grid">
            <label className="radio-label">
              <input
                type="radio"
                name="queryType"
                value="general"
                className="radio-input"
                checked={queryType === "general"}
                onChange={(e) => {
                  setQueryType(e.target.value);
                  clearError("queryType");
                }}
              />
              <span className="radio-text">General Enquiry</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="queryType"
                value="support"
                className="radio-input"
                checked={queryType === "support"}
                onChange={(e) => {
                  setQueryType(e.target.value);
                  clearError("queryType");
                }}
              />
              <span className="radio-text">Support Request</span>
            </label>
            <ErrorMessage error={errors.queryType} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Message*</label>
          <textarea
            rows={5}
            className="form-textarea"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              clearError("message");
            }}
          />
          <ErrorMessage error={errors.message} />
        </div>

        <div className="checkbox-group flex flex-col gap-0!">
          <div className="flex gap-2">
            <input
              type="checkbox"
              className="form-checkbox"
              name="consent"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                clearError("consent");
              }}
            />
            <p className="checkbox-text">
              I consent to being contacted by the team *
            </p>
          </div>
          <ErrorMessage error={errors.consent} />
        </div>

        <button className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default App;
