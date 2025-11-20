import React, { useEffect, useState } from 'react';
import './CaseStudiesPage.css';
import CaseStudyCard from '../components/CaseStudyCard';
import CaseStudyForm from '../components/CaseStudyForm';

function CaseStudiesPage() {
  const fallback = [
    {
      id: 1,
      rating: 5,
      title: 'So happy with my service from IOTTech!',
      testimonial:
        "The software developed by IOTTech has truly exceeded my expectations. Not only is it innovative and reliable, but it was also designed in a way that makes it easy for our entire team to use. The employees quickly adapted to the system, and it has streamlined so many of our daily operations. I'm impressed by both the quality of the product and the support we've received throughout the process.",
      client: "Kendall-Jackson's",
      image: 'images/BigM.png'
    },
    {
      id: 2,
      rating: 4,
      title: 'Exceptional job!',
      testimonial:
        "The management services provided by IOTTech played a crucial role in helping my company reach its goals. Their team took the time to understand our unique needs and developed strategies that maximized our efficiency and profitability. Thanks to their guidance, we've been able to grow steadily and make confident business decisions for the future.",
      client: 'All Natural Nails',
      image: 'images/Times.png'
    },
    {
      id: 3,
      rating: 5,
      title: 'IOTTech transformed the way we run our business!',
      testimonial:
        "Partnering with IOTTech has been one of the best decisions we've ever made. Their solutions allowed us to automate repetitive tasks, which freed up our staff to focus on more meaningful projects. The software is intuitive, efficient, and completely customized to our needs. We've seen a noticeable boost in productivity and overall team morale since implementation.",
      client: 'Greenfield Enterprises',
      image: 'images/comp.png'
    }
  ];

  const [caseStudies, setCaseStudies] = useState(fallback);
  const [editing, setEditing] = useState(null); 
  const [showForm, setShowForm] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    const apiBase = process.env.REACT_APP_API_URL;
    const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const allowApi = apiBase && (isLocal || !apiBase.includes('localhost'));
    if (!allowApi) return;

    let cancelled = false;
    fetch(`${apiBase.replace(/\/$/, '')}/casestudies`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) setCaseStudies(data);
      })
      .catch(() => {
        // keep fallback
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const openAddForm = () => {
    setEditing(null);
    setShowForm(true);
  };

  const openEditForm = (study) => {
    setEditing(study);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditing(null);
    setShowForm(false);
  };

  const handleSave = async (data) => {
    const apiBase = process.env.REACT_APP_API_URL;
    const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const allowApi = apiBase && (isLocal || !apiBase.includes('localhost'));

    if (editing) {
      setCaseStudies((prev) => prev.map((s) => (s.id === editing.id ? { ...s, ...data } : s)));
      setStatusMessage('Updating...');
      if (allowApi) {
        const res = await fetch(`${apiBase.replace(/\/$/, '')}/casestudies/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          const updated = await res.json();
          setCaseStudies((prev) => prev.map((s) => (s.id === editing.id ? updated : s)));
          setStatusMessage('Updated successfully');
        } else {
          setStatusMessage('Failed to update on server');
        }
      } else {
        setStatusMessage('Updated (local only)');
      }
    } else {
      setStatusMessage('Adding...');
      if (allowApi) {
        const res = await fetch(`${apiBase.replace(/\/$/, '')}/casestudies`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          const created = await res.json();
          setCaseStudies((prev) => [...prev, created]);
          setStatusMessage('Added successfully');
        } else {
          setStatusMessage('Failed to add on server');
        }
      } else {
        const newItem = { ...data, id: Date.now() };
        setCaseStudies((prev) => [...prev, newItem]);
        setStatusMessage('Added (local only)');
      }
    }

    setTimeout(() => {
      setShowForm(false);
      setEditing(null);
      setStatusMessage(null);
    }, 1200);
  };

  const handleDelete = async (study) => {
    if (!window.confirm('Delete this case study?')) return;
    const apiBase = process.env.REACT_APP_API_URL;
    const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const allowApi = apiBase && (isLocal || !apiBase.includes('localhost'));

    setCaseStudies((prev) => prev.filter((s) => s.id !== study.id));
    setStatusMessage('Deleting...');

    if (allowApi) {
      const res = await fetch(`${apiBase.replace(/\/$/, '')}/casestudies/${study.id}`, { method: 'DELETE' });
      if (res.ok) {
        setStatusMessage('Deleted');
      } else {
        setStatusMessage('Failed to delete on server');
      }
    } else {
      setStatusMessage('Deleted (local only)');
    }

    setTimeout(() => setStatusMessage(null), 1200);
  };

  return (
    <div className="case-studies-page">
      <div className="case-studies-header">
        <h2>Client Stories</h2>
        <div className="header-actions">
          <button className="nav-link btn-primary diagnostic-force" onClick={openAddForm}>Add Case Study</button>
        </div>
      </div>

      {statusMessage && <div className="status-msg">{statusMessage}</div>}

      {showForm && (
        <div className="case-study-form-area">
          <CaseStudyForm initialData={editing} onCancel={handleCancel} onSave={handleSave} />
        </div>
      )}

      <p className="case-studies-intro">Discover how we've helped businesses transform their operations and achieve their goals through our comprehensive consulting services.</p>
      <div className="case-studies-grid">
        {caseStudies.map((study) => (
          <CaseStudyCard
            key={study.id}
            rating={"★".repeat(study.rating) + (study.rating < 5 ? ` ${study.rating} Stars` : ' 5 Stars')}
            title={study.title}
            testimonial={study.testimonial}
            client={study.client}
            image={study.image}
            onEdit={() => openEditForm(study)}
            onDelete={() => handleDelete(study)}
          />
        ))}
      </div>
    </div>
  );
}

export default CaseStudiesPage;