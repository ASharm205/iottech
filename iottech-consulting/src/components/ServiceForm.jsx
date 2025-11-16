import React, { useState } from 'react';
import './ServiceForm.css';

function ServiceForm({ onServiceAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    page: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  // Validation rules matching server-side Joi validation
  const validateForm = () => {
    const newErrors = {};

    // Title validation: required, string, min 2, max 100
    if (!formData.title || formData.title.trim().length === 0) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters';
    }

    // Description validation: required, string, min 5, max 500
    if (!formData.description || formData.description.trim().length === 0) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 5) {
      newErrors.description = 'Description must be at least 5 characters';
    } else if (formData.description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    // Image validation: required, string, valid URL or relative path
    if (!formData.image || formData.image.trim().length === 0) {
      newErrors.image = 'Image URL is required';
    } else if (
      !formData.image.startsWith('http') &&
      !formData.image.startsWith('images/') &&
      !formData.image.startsWith('/')
    ) {
      newErrors.image = 'Image must be a valid URL or relative path (e.g., images/file.png)';
    }

    // Page validation: required, string, valid page reference
    if (!formData.page || formData.page.trim().length === 0) {
      newErrors.page = 'Page reference is required';
    } else if (formData.page.length > 50) {
      newErrors.page = 'Page reference cannot exceed 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    // Client-side validation
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);

    try {
      const apiBase = process.env.REACT_APP_API_URL;
      if (!apiBase) {
        setSubmitStatus('error');
        setErrors({ form: 'API not configured' });
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(
        `${apiBase.replace(/\/$/, '')}/services`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      if (response.ok) {
        const newService = await response.json();
        setSubmitStatus('success');
        setFormData({ title: '', description: '', image: '', page: '' });
        setErrors({});

        // Notify parent component to update the services list
        if (onServiceAdded) {
          onServiceAdded(newService);
        }

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 3000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setSubmitStatus('error');
        if (errorData.details) {
          // Parse Joi validation errors from server
          const serverErrors = {};
          errorData.details.forEach((detail) => {
            serverErrors[detail.context.key] = detail.message;
          });
          setErrors(serverErrors);
        } else {
          setErrors({ form: errorData.message || 'Failed to add service' });
        }
      }
    } catch (err) {
      setSubmitStatus('error');
      setErrors({ form: `Error: ${err.message}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="service-form-container">
      <div className="service-form-card">
        <h2>Add a Consulting Service</h2>
        <p className="form-subtitle">Share your consulting expertise with our network</p>

        {submitStatus === 'success' && (
          <div className="alert alert-success">
            ✓ Consulting service added successfully! It will appear in the services list.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="alert alert-error">
            ✗ Failed to add consulting service. Please check your inputs and try again.
          </div>
        )}

        <form onSubmit={handleSubmit} className="service-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Service Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., IoT Infrastructure Consulting"
              className={`form-input ${errors.title ? 'input-error' : ''}`}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
            <span className="char-count">
              {formData.title.length}/100
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your consulting service, expertise, and what clients can expect..."
              className={`form-textarea ${errors.description ? 'input-error' : ''}`}
              rows="6"
            />
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
            <span className="char-count">
              {formData.description.length}/500
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">
              Image URL <span className="required">*</span>
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="e.g., images/service.png or https://example.com/image.png"
              className={`form-input ${errors.image ? 'input-error' : ''}`}
            />
            {errors.image && <span className="error-message">{errors.image}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="page" className="form-label">
              Page Reference <span className="required">*</span>
            </label>
            <input
              type="text"
              id="page"
              name="page"
              value={formData.page}
              onChange={handleChange}
              placeholder="e.g., cloud-migration, consulting, etc."
              className={`form-input ${errors.page ? 'input-error' : ''}`}
            />
            {errors.page && <span className="error-message">{errors.page}</span>}
          </div>

          {errors.form && <span className="error-message form-error">{errors.form}</span>}

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Service...' : 'Add Service'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ServiceForm;
