import { useId, useRef, useState } from 'react'
import '../styles/RegistrationForm.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const INITIAL_VALUES = {
  fullName: '',
  email: '',
  topic: '',
  consent: false,
}

function validate(values) {
  const errors = {}

  const fullName = values.fullName.trim()
  if (!fullName) {
    errors.fullName = 'Full name is required.'
  } else if (fullName.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.'
  }

  const email = values.email.trim()
  if (!email) {
    errors.email = 'Email address is required.'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.topic) {
    errors.topic = 'Please select a topic of interest.'
  }

  if (!values.consent) {
    errors.consent = 'You must agree to the privacy notice before registering.'
  }

  return errors
}

function RegistrationForm({ copy }) {
  const baseId = useId()
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)
  const statusRef = useRef(null)

  const ids = {
    fullName: `${baseId}-full-name`,
    email: `${baseId}-email`,
    topic: `${baseId}-topic`,
    consent: `${baseId}-consent`,
    fullNameError: `${baseId}-full-name-error`,
    emailError: `${baseId}-email-error`,
    topicError: `${baseId}-topic-error`,
    consentError: `${baseId}-consent-error`,
    privacy: `${baseId}-privacy`,
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    const nextValue = type === 'checkbox' ? checked : value

    setValues((prev) => ({ ...prev, [name]: nextValue }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
    if (status === 'success') {
      setStatus('idle')
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      const firstField = ['fullName', 'email', 'topic', 'consent'].find((field) => nextErrors[field])
      if (firstField) {
        document.getElementById(ids[firstField])?.focus()
      }
      return
    }

    setStatus('success')
    setValues(INITIAL_VALUES)
    setIsPrivacyOpen(false)
    requestAnimationFrame(() => {
      statusRef.current?.focus()
    })
  }

  return (
    <section id="register" className="section register-section" aria-labelledby="register-heading">
      <div className="container">
        <div className="register-card">
          <div className="register-header">
            <h2 id="register-heading" className="register-title">
              {copy.formTitle}
            </h2>
            <p className="register-intro">{copy.formIntro}</p>
          </div>

          <div
            ref={statusRef}
            tabIndex={-1}
            className="form-status"
            aria-live="polite"
            aria-atomic="true"
          >
            {status === 'success' ? (
              <p className="success-message" role="status">
                {copy.success}
              </p>
            ) : null}
            {status === 'error' ? (
              <p className="form-error-summary" role="alert">
                Please correct the highlighted fields and try again.
              </p>
            ) : null}
          </div>

          <form className="register-form" noValidate onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="field">
                <label className="field-label" htmlFor={ids.fullName}>
                  {copy.fields.fullName}
                </label>
                <input
                  id={ids.fullName}
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  className={`field-control${errors.fullName ? ' has-error' : ''}`}
                  value={values.fullName}
                  onChange={handleChange}
                  aria-invalid={errors.fullName ? 'true' : 'false'}
                  aria-describedby={errors.fullName ? ids.fullNameError : undefined}
                />
                {errors.fullName ? (
                  <p id={ids.fullNameError} className="field-error" role="status">
                    {errors.fullName}
                  </p>
                ) : null}
              </div>

              <div className="field">
                <label className="field-label" htmlFor={ids.email}>
                  {copy.fields.email}
                </label>
                <input
                  id={ids.email}
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  className={`field-control${errors.email ? ' has-error' : ''}`}
                  value={values.email}
                  onChange={handleChange}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? ids.emailError : undefined}
                />
                {errors.email ? (
                  <p id={ids.emailError} className="field-error" role="status">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div className="field">
                <label className="field-label" htmlFor={ids.topic}>
                  {copy.fields.topic}
                </label>
                <div className="select-wrap">
                  <select
                    id={ids.topic}
                    name="topic"
                    className={`field-control field-select${errors.topic ? ' has-error' : ''}`}
                    value={values.topic}
                    onChange={handleChange}
                    aria-invalid={errors.topic ? 'true' : 'false'}
                    aria-describedby={errors.topic ? ids.topicError : undefined}
                  >
                    <option value="">Select a topic</option>
                    {copy.topics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                  <span className="select-arrow" aria-hidden="true">
                    <svg viewBox="0 0 12 8" width="12" height="8" fill="none">
                      <path
                        d="M1 1.5 6 6.5 11 1.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                {errors.topic ? (
                  <p id={ids.topicError} className="field-error" role="status">
                    {errors.topic}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="consent-block">
              <div className="consent-row">
                <input
                  id={ids.consent}
                  name="consent"
                  type="checkbox"
                  className="consent-input"
                  checked={values.consent}
                  onChange={handleChange}
                  aria-invalid={errors.consent ? 'true' : 'false'}
                  aria-describedby={errors.consent ? ids.consentError : undefined}
                />
                <label className="consent-label" htmlFor={ids.consent}>
                  {copy.fields.consent}
                </label>
              </div>
              {errors.consent ? (
                <p id={ids.consentError} className="field-error consent-error" role="status">
                  {errors.consent}
                </p>
              ) : null}

              <button
                type="button"
                className="privacy-toggle"
                aria-expanded={isPrivacyOpen}
                aria-controls={ids.privacy}
                onClick={() => setIsPrivacyOpen((open) => !open)}
              >
                <span>{copy.privacyLink}</span>
                <span className={`privacy-toggle-icon${isPrivacyOpen ? ' open' : ''}`} aria-hidden="true">
                  <svg viewBox="0 0 12 8" width="12" height="8" fill="none">
                    <path
                      d="M1 1.5 6 6.5 11 1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              <div id={ids.privacy} className="privacy-panel" hidden={!isPrivacyOpen}>
                <p>{copy.privacy}</p>
              </div>
            </div>

            <button type="submit" className="button button-primary submit-button">
              {copy.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default RegistrationForm
