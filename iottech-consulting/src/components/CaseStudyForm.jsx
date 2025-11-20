import React, { useState, useEffect } from 'react';
import './CaseStudyForm.css';

function CaseStudyForm({ initialData = null, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    testimonial: '',
    client: '',
    image: '',
    rating: 5
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        testimonial: initialData.testimonial || '',
        client: initialData.client || '',
        image: initialData.image || '',
        rating: initialData.rating || 5
      });
    }
  }, [initialData]);

  // Client-side validation matching server-side Joi rules (inferred):
  // title: required, string, 2-150
  // testimonial: required, string, 10-1000
  // client: required, string, 2-100
  // image: required, url or relative path
  // rating: required, integer 1-5
  function validate() {
    const errs = {};
    const t = formData.title && formData.title.trim();
    if (!t) errs.title = 'Title is required';
    else if (t.length < 2) errs.title = 'Title must be at least 2 characters';
    else if (t.length > 150) errs.title = 'Title cannot exceed 150 characters';

    const testi = formData.testimonial && formData.testimonial.trim();
    if (!testi) errs.testimonial = 'Testimonial is required';
    else if (testi.length < 10) errs.testimonial = 'Testimonial must be at least 10 characters';
    else if (testi.length > 1000) errs.testimonial = 'Testimonial cannot exceed 1000 characters';

    const c = formData.client && formData.client.trim();
    if (!c) errs.client = 'Client name is required';
    else if (c.length < 2) errs.client = 'Client name must be at least 2 characters';
    else if (c.length > 100) errs.client = 'Client name cannot exceed 100 characters';

    if (!formData.image || formData.image.trim().length === 0) {
      errs.image = 'Image path or URL is required';
    } else if (
      !formData.image.startsWith('http') &&
      !formData.image.startsWith('images/') &&
      !formData.image.startsWith('/')
    ) {
      errs.image = 'Image must be a valid URL or relative path (e.g., images/file.png)';
    }

    const rating = Number(formData.rating);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      errs.rating = 'Rating must be an integer between 1 and 5';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (!validate()) {
      setStatus('error');
      return;
    }
    setIsSubmitting(true);

    try {
      // Caller (page) decides API call. Here we just hand data back via onSave.
      if (onSave) {
        await onSave(formData);
      }
      setStatus('success');
      // Clear only if adding (no initialData)
      if (!initialData) setFormData({ title: '', testimonial: '', client: '', image: '', rating: 5 });
      // clear status after 2.5s
      setTimeout(() => setStatus(null), 2500);
    } catch (err) {
      setStatus('error');
      setErrors({ form: err.message || 'Failed to save' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="case-study-form-container">
      <form className="case-study-form" onSubmit={handleSubmit}>
        <h3>{initialData ? 'Edit Case Study' : 'Add Case Study'}</h3>

        {status === 'success' && <div className="alert alert-success">Saved successfully</div>}
        {status === 'error' && <div className="alert alert-error">There were validation errors</div>}

        <label>Title <span className="required">*</span></label>
        <input name="title" value={formData.title} onChange={handleChange} />
        {errors.title && <div className="error">{errors.title}</div>}

        <label>Testimonial <span className="required">*</span></label>
        <textarea name="testimonial" value={formData.testimonial} onChange={handleChange} rows={5} />
        {errors.testimonial && <div className="error">{errors.testimonial}</div>}

        <label>Client <span className="required">*</span></label>
        <input name="client" value={formData.client} onChange={handleChange} />
        {errors.client && <div className="error">{errors.client}</div>}

        <label>Image path or URL <span className="required">*</span></label>
        <input name="image" value={formData.image} onChange={handleChange} placeholder="images/filename.png or https://..." />
        {errors.image && <div className="error">{errors.image}</div>}

        <label>Rating (1-5) <span className="required">*</span></label>
        <input name="rating" value={formData.rating} onChange={handleChange} type="number" min="1" max="5" />
        {errors.rating && <div className="error">{errors.rating}</div>}

        {errors.form && <div className="error">{errors.form}</div>}

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onCancel} disabled={isSubmitting}>Cancel</button>
          <button type="submit" className="btn-save" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </div>
  );
}

export default CaseStudyForm;
