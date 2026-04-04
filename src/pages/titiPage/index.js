import { Fragment, useEffect, useState } from 'react';
import Script from 'next/script';
import axios from 'axios';
import classes from '../../styles/titiPage.module.css';

const ATTRIBUTE_FIELDS = [
  'light',
  'dark',
  'colourful',
  'warm',
  'bright',
  'cool',
  'fancy',
  'casual',
  'business',
  'evening',
  'minimalist',
  'vintage',
  'modern',
  'floral',
];

const CLOTH_OPTIONS = ['shirts', 'trousers', 'jacket', 'dresses', 'skirts', 'shoes'];

const INITIAL_FORM = ATTRIBUTE_FIELDS.reduce(
  (form, field) => ({ ...form, [field]: '' }),
  {
    cloth: '',
    name: '',
    brand: '',
    img_url: '',
  }
);

function getAttributesPerRow(width) {
  if (width < 700) {
    return 1;
  }

  if (width < 1100) {
    return 2;
  }

  return 3;
}

function TitiPage() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [attributesPerRow, setAttributesPerRow] = useState(3);
  const attributeRows = [];

  useEffect(() => {
    const updateAttributesPerRow = () => {
      setAttributesPerRow(getAttributesPerRow(window.innerWidth));
    };

    updateAttributesPerRow();
    window.addEventListener('resize', updateAttributesPerRow);

    return () => {
      window.removeEventListener('resize', updateAttributesPerRow);
    };
  }, []);

  for (let index = 0; index < ATTRIBUTE_FIELDS.length; index += attributesPerRow) {
    attributeRows.push(ATTRIBUTE_FIELDS.slice(index, index + attributesPerRow));
  }

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const hasMissingAttribute = ATTRIBUTE_FIELDS.some((field) => formData[field] === '');
    const parsedAttributes = ATTRIBUTE_FIELDS.reduce((attributes, field) => {
      attributes[field] = Number.parseInt(formData[field], 10);
      return attributes;
    }, {});
    const hasInvalidAttribute = Object.values(parsedAttributes).some((value) => !Number.isInteger(value));

    if (!formData.cloth || !formData.name || !formData.brand || !formData.img_url || hasMissingAttribute) {
      setFeedback({ type: 'error', message: 'Every field, including all attributes, requires a value.' });
      return;
    }

    if (hasInvalidAttribute) {
      setFeedback({ type: 'error', message: 'Each attribute must be a valid integer.' });
      return;
    }

    const payload = {
      name: formData.name.trim(),
      brand: formData.brand.trim(),
      img_url: formData.img_url.trim(),
    };

    ATTRIBUTE_FIELDS.forEach((field) => {
      payload[field] = parsedAttributes[field];
    });

    setIsSubmitting(true);
    setFeedback(null);

    try {
      await axios.post(
        `clothes/${encodeURIComponent(formData.cloth.trim())}/create`,
        payload
      );

      setFeedback({ type: 'success', message: 'Database entry created successfully.' });
      setFormData(INITIAL_FORM);
    } catch (error) {
      console.error('Error creating clothing entry:', error);
      setFeedback({
        type: 'error',
        message: error.response?.data?.detail || error.message || 'Network error creating entry.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={classes.page}>
      <Script src="https://tenor.com/embed.js" strategy="lazyOnload" />

      <div className={classes.header}>
        <h1>Clothing Entry Creator</h1>
      </div>

      <div className={classes.funCard}>
        <h2>Frebby Dance</h2>
        <div
          className="tenor-gif-embed"
          data-postid="62289160082415997"
          data-share-method="host"
          data-aspect-ratio="1"
          data-width="100%"
        >
          <a href="https://tenor.com/view/freddy-boogie-gif-62289160082415997">
            Freddy boogie GIF
          </a>
        </div>
      </div>

      <div className={classes.contentLayout}>
        <div className={classes.entrySection}>
          <form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.topFields}>
              <label className={classes.field}>
                <span>Cloth</span>
                <select
                  name="cloth"
                  value={formData.cloth}
                  onChange={handleTextChange}
                >
                  <option value="">Select cloth type</option>
                  {CLOTH_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className={classes.field}>
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleTextChange}
                  placeholder="Relaxed Oxford Shirt"
                />
              </label>

              <label className={classes.field}>
                <span>Brand</span>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleTextChange}
                  placeholder="Gap"
                />
              </label>

              <label className={`${classes.field} ${classes.wideField}`}>
                <span>Image URL</span>
                <input
                  type="url"
                  name="img_url"
                  value={formData.img_url}
                  onChange={handleTextChange}
                  placeholder="https://..."
                />
              </label>
            </div>

            <div className={classes.tableWrap}>
              <table className={classes.table}>
                <thead>
                  <tr>
                    {Array.from({ length: attributesPerRow }, (_, index) => (
                      <Fragment key={`header-${index}`}>
                        <th>Attribute</th>
                        <th>Value</th>
                      </Fragment>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {attributeRows.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                      {row.map((field) => (
                        <Fragment key={field}>
                          <th key={`${field}-label`} scope="row" className={classes.attributeName}>
                            {field}
                          </th>
                          <td>
                            <input
                              type="number"
                              name={field}
                              value={formData[field]}
                              onChange={handleCheckboxChange}
                              step="1"
                              required
                            />
                          </td>
                        </Fragment>
                      ))}
                      {row.length < attributesPerRow &&
                        Array.from({ length: attributesPerRow - row.length }, (_, index) => (
                          <Fragment key={`empty-${rowIndex}-${index}`}>
                            <th className={classes.emptyCell} />
                            <td className={classes.emptyCell} />
                          </Fragment>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={classes.actions}>
              <button type="submit" className={classes.submitButton} disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Entry'}
              </button>
              {feedback && (
                <p className={feedback.type === 'success' ? classes.successMessage : classes.errorMessage}>
                  {feedback.message}
                </p>
              )}
            </div>
          </form>
        </div>

        <aside className={classes.previewCard}>
          <h2>Image Preview</h2>
          {formData.img_url ? (
            <img
              src={formData.img_url}
              alt={formData.name || 'Clothing preview'}
              className={classes.previewImage}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className={classes.previewPlaceholder}>
              Add an image URL to preview it here.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default TitiPage;
