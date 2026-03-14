import classes from './MainNavigation.module.css'
import Link from 'next/link'
import { useContext, useState } from 'react'
import GlobalContext from "../../pages/store/globalContext"
import { useRouter } from 'next/router'

function MainNavigation() {
  const globalCtx = useContext(GlobalContext)
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={classes.header}>
      <div className={classes.leftSection}>
        <div className={classes.icon} onClick={() => router.push('/')} style={{cursor: 'pointer'}}>
          <img src="/FF-png-notxt.png" alt="Icon" className={classes.iconImage} />
        </div>
        FitFinder
      </div>
      <nav className={menuOpen ? classes.open : ''}>
        <ul>
          <li><Link href='/' onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link href='/recom' onClick={() => setMenuOpen(false)}>Outfit Ideas</Link></li>
          <li><Link href='/catalogue' onClick={() => setMenuOpen(false)}>Catalogue</Link></li>
          <li><Link href='/titiPage' onClick={() => setMenuOpen(false)}>Titi</Link></li>
        </ul>
      </nav>
      <div className={classes.userSection}>
        {globalCtx.theGlobalObject.username ? (
          <>
            <span className={classes.username}>{globalCtx.theGlobalObject.username}</span>
            <button className={classes.logoutBtn} onClick={globalCtx.logout}>Logout</button>
          </>
        ) : (
          <Link href='/auth/login' className={classes.loginLink}>Log In</Link>
        )}
      </div>
      <button className={classes.hamburger} onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
        <span /><span /><span />
      </button>
    </header>
  );
}

export default MainNavigation