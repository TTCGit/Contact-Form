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

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    message: "",
    consent: false,
  });

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

    const firstNameError = validateName(formData.firstName, "First name");
    const lastNameError = validateName(formData.lastName, "Last name");
    const emailError = validateEmail(formData.email);
    const queryTypeError = validateQueryType(formData.queryType);
    const messageError = validateMessage(formData.message);
    const consentError = validateConsent(formData.consent);

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

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      queryType: "",
      message: "",
      consent: false,
    });

    console.log(formData);

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
              value={formData.firstName}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  firstName: e.target.value,
                });
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
              value={formData.lastName}
              className="form-input"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  lastName: e.target.value,
                });
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
            value={formData.email}
            className="form-input"
            onChange={(e) => {
              setFormData({
                ...formData,
                email: e.target.value,
              });
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
                checked={formData.queryType === "general"}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    queryType: e.target.value,
                  });
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
                checked={formData.queryType === "support"}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    queryType: e.target.value,
                  });
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
            value={formData.message}
            onChange={(e) => {
              setFormData({
                ...formData,
                message: e.target.value,
              });
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
              checked={formData.consent}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  consent: e.target.checked,
                });
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
