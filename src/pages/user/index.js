import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import styles from './user.module.css';

function UserPage() {
  const [user, setUser] = useState(null);
  const [likeSets, setLikeSets] = useState([]);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const logout = () => {
    Cookies.remove('user_id');
    router.push('/');
  };

  useEffect(() => {
    setMounted(true);
    const user_id = Cookies.get('user_id');
    if (!user_id) { setError('No user session found.'); return; }

    axios.get(`/user/users/${user_id}`)
      .then(({ data }) => { console.log('user:', data); setUser(data); })
      .catch((e) => { console.error('user error:', e); setError('Failed to load user information.'); });

    axios.get(`/user/likes/${user_id}`)
      .then(({ data }) => {
        console.log('likes:', data);
        return Promise.all(
          data.map(set => {
            const ids = Object.entries(set)
              .filter(([key]) => key.startsWith('item_id'))
              .map(([, val]) => val);
            return Promise.all(ids.map(id => axios.get(`/clothes/geto/${id}`).then(r => r.data)));
          })
        );
      })
      .then(sets => setLikeSets(sets))
      .catch((e) => { console.error('likes error:', e); setLikeSets([]); });
  }, []);

  

  if (!mounted) return null;
  if (error) return <p style={{ textAlign: 'center', color: '#c0392b', marginTop: '3rem' }}>{error}</p>;
  if (!user) return <p style={{ textAlign: 'center', marginTop: '3rem' }}>Loading...</p>;

  return (
    <div className={styles.page}>

      {/* User Info */}
      <div className={styles.card}>
        <h1 className={styles.title}>Your Profile</h1>
        <div className={styles.fields}>
          <Field label="First Name" value={user.first_name} />
          <Field label="Last Name" value={user.last_name} />
          <Field label="Email" value={user.email} />
        </div>
        <button onClick={logout} className={styles.logoutBtn}>Logout</button>
      </div>

      {/* Liked Sets */}
      <div className={styles.card}>
        <h2 className={styles.title}>Liked Outfits</h2>
        {likeSets.length === 0 ? (
          <p className={styles.empty}>No liked outfits yet.</p>
        ) : (
          <div className={styles.setsList}>
            {likeSets.map((set, i) => (
              <div key={i} className={styles.outfitSet}>
                <p className={styles.outfitLabel}>Outfit {i + 1}</p>
                <div className={styles.outfitGrid}>
                  {set.map((item) => (
                    <div key={item.id} className={styles.itemCard}>
                      <img src={item.img_url} alt={item.name} />
                      <div className={styles.itemInfo}>
                        <p className={styles.itemName}>{item.name}</p>
                        <p className={styles.itemBrand}>{item.brand}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

const Field = ({ label, value }) => (
  <div className={styles.fieldWrapper}>
    <span className={styles.fieldLabel}>{label}</span>
    <span className={styles.fieldValue}>{value || '—'}</span>
  </div>
);

export default UserPage;
