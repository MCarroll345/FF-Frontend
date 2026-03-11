import { useState } from 'react';
import axios from 'axios';
import classes from '../../styles/recom.module.css';

const ATTR_LIST = [
  'light',
  'dark',
  'bright',
  'warm',
  'cool',
  'lightweight',
  'fancy',
  'casual',
  'business',
  'lounge',
  'evening',
  'minimalist',
  'vintage',
  'modern',
  'soft',
  'comfortable',
  'layerable',
];

const MIN_ATTR = 4;

function normalizeImageSrc(value) {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim().replace(/^['"]+|['"]+$/g, '');
}

function RecomPage() {
  const [recommend, setRecommend] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const aws_recom = 'http://localhost:8000';

  const handleOptionToggle = (option) => {
    setSelectedOptions((previousSelections) => {
      if (previousSelections.includes(option)) {
        return previousSelections.filter((item) => item !== option);
      }

      if (previousSelections.length >= MIN_ATTR) {
        return previousSelections;
      }

      return [...previousSelections, option];
    });
  };

  const getRecommendations = async () => {
    if (selectedOptions.length !== MIN_ATTR) {
      alert(`Please choose exactly ${MIN_ATTR} options before getting recommendations.`);
      return;
    }

    const [c1, c2, c3, c4] = selectedOptions.map((option) => encodeURIComponent(option));

    try {
      const { data } = await axios.get(`${aws_recom}/${c1}/${c2}/${c3}/${c4}/getrecom`);

      setRecommend(data);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      alert(error.response?.data?.detail || 'Network error getting recommendations');
    }
  };

  const recommendationItems = [1, 2, 3, 4]
    .map((index) => {
      const name = recommend?.[`name${index}`];
      const image = normalizeImageSrc(
        recommend?.[`image${index}`]
        || recommend?.[`img_url${index}`]
        || recommend?.[`img${index}`]
        || recommend?.[`url${index}`]
      );

      if (!name && !image) {
        return null;
      }

      return {
        id: index,
        name: name || `Look ${index}`,
        image,
      };
    })
    .filter(Boolean);

  return (
    <div className={classes.container}>
      <h1>Outfit Ideas</h1>
      <p className={classes.selectionCount}>
        Choose up to {MIN_ATTR} options. Selected: {selectedOptions.length}/{MIN_ATTR}
      </p>

      <div className={classes.checklistGrid}>
        {ATTR_LIST.map((option) => {
          const isChecked = selectedOptions.includes(option);
          const disableUnchecked = !isChecked && selectedOptions.length >= MIN_ATTR;

          return (
            <label
              key={option}
              className={`${classes.checklistCard} ${isChecked ? classes.checkedCard : ''} ${disableUnchecked ? classes.disabledCard : ''}`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleOptionToggle(option)}
                disabled={disableUnchecked}
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>

      <h2>Your Recommendations</h2>

      <button
        onClick={getRecommendations}
        className={classes.deleteBtn}
        disabled={selectedOptions.length !== MIN_ATTR}
      >
        Get Recommendations
      </button>

      <div className={classes.resultsSection}>
        <p className={classes.resultsIntro}>
          {recommendationItems.length > 0
            ? 'Here is your recommended outfit combination.'
            : 'Choose 4 options and fetch recommendations to see an outfit here.'}
        </p>

        <div className={classes.recommendationGrid}>
          {recommendationItems.map((item) => (
            <article key={item.id} className={classes.recommendationCard}>
              <div className={classes.recommendationImageWrap}>
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className={classes.recommendationImage}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className={classes.imageFallback}>No image available</div>
                )}
              </div>
              <div className={classes.recommendationContent}>
                <span className={classes.recommendationLabel}>Item {item.id}</span>
                <h3>{item.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecomPage;
