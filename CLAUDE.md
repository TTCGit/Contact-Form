# Contact Form - Form Validation Project

**Date:** 2026-03-09
**Goal:** Learn form validation in React without libraries

---

## 🎯 What I Built

A complete contact form with custom validation:
- 6 form fields: firstName, lastName, email, queryType (radio), message (textarea), consent (checkbox)
- Custom validation functions for each field type
- Real-time error clearing on user input
- Success toast notification
- Fully controlled inputs

---

## 📚 Key Learnings

### 1. Form Validation Pattern
- Validate on submit (not on every keystroke)
- Clear errors when user starts typing
- Use separate validation functions for each field type
- Store errors in a state object

### 2. Controlled Inputs
- All inputs MUST have `value` and `onChange`
- Checkbox uses `checked` instead of `value`
- Radio buttons use `checked={value === "option"}`

### 3. State Management
```jsx
// Form fields state
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
// ... etc

// Errors state
const [errors, setErrors] = useState({
  firstName: "",
  lastName: "",
  // ... etc
});
```

### 4. Validation Functions

**Pattern for reusable validation:**
```jsx
const validateName = (name, fieldName) => {
  if (!name.trim()) return `${fieldName} is required`;
  if (name.trim().length < 2) return `${fieldName} must be at least 2 characters`;
  return "";  // No error
};
```

### 5. Clear Error on Change
```jsx
const clearError = (fieldName) => {
  setErrors({
    ...errors,        // Keep all existing errors
    [fieldName]: "",  // Clear only this field's error
  });
};
```

### 6. Email Validation with Regex
```jsx
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) return "Please enter a valid email address";
```

---

## 🧩 Components

### `App.jsx`
Main form component with:
- Form state (firstName, lastName, email, queryType, message, consent)
- Error state
- Validation functions
- Submit handler
- Form JSX

### `ErrorMessage.jsx`
Reusable error display component:
```jsx
const ErrorMessage = ({ error }) => {
  if (!error) return null;
  return <p className="error-message">{error}</p>;
};
```

### `SuccessMessage.jsx`
Toast notification component:
- Appears from top with fade-in animation
- Displays success message
- Disappears after 3 seconds

---

## 🔑 Important Code Patterns

### Submit Handler
```jsx
const onSubmit = (e) => {
  e.preventDefault();

  // Validate all fields
  const firstNameError = validateName(firstName, "First name");
  const lastNameError = validateName(lastName, "Last name");
  // ... etc

  // Check if any errors
  if (firstNameError || lastNameError || emailError || ...) {
    setErrors({
      firstName: firstNameError,
      lastName: lastNameError,
      // ... etc
    });
    return;  // Stop submission
  }

  // If no errors, proceed
  setSuccessMessage("success");
  // Reset form...
};
```

### Input with Error Clearing
```jsx
<input
  type="text"
  value={firstName}
  onChange={(e) => {
    setFirstName(e.target.value);
    clearError("firstName");
  }}
/>
<ErrorMessage error={errors.firstName} />
```

---

## 💡 React Concepts Applied

- ✅ `useState` for state management
- ✅ Controlled components
- ✅ Event handlers (onChange, onSubmit)
- ✅ Conditional rendering (`&&` operator)
- ✅ Template literals for dynamic strings
- ✅ Spread operator for updating objects
- ✅ Component props
- ✅ Early returns for validation

---

## 🚀 Next Steps

- [ ] Multi-step form (wizard with multiple pages)
- [ ] API integration (submit to backend)
- [ ] Custom hooks (useForm)
- [ ] Dynamic fields (add/remove inputs)
- [ ] Real-time validation (debounced)

---

## 📝 Notes

**Learning Method (from psychologist):**
- 20 min → new concepts
- 30 min → practice & apply
- 10 min break
- 1 hour something else

**This project took:** ~3-4 hours total (with breaks and explanations)

**Best practices learned:**
- Always use controlled inputs in React
- Validate on submit, clear on change (best UX)
- Keep validation functions pure and reusable
- Use meaningful error messages
- Reset form after successful submission