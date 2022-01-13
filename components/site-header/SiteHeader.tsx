import React, { useState } from 'react'
import Link                from 'next/link'
import { useRouter }       from 'next/router'
import FormLogin           from '../form-user-login/FormLogin'
import ButtonLogout        from '../button-logout/ButtonLogout'
import styles              from './SiteHeader.module.css'

type User = {
  name: string
}

type props = {
  user: User
}

const SiteHeader: React.FC<props> = ({ user }) => {

  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const [currentUser, setCurrentUser] = useState(user.name)

  return (
    <nav className={styles.header}>
      <div>
        <Link href="/">
          <a data-active={isActive("/")} className={isActive('/') ? styles.disabled : ''}>Home</a>
        </Link>
        <Link href="/account">
          <a data-active={isActive("/account")} className={isActive('/account') ? styles.disabled : ''}>Account</a>
        </Link>
      </div>
      {!currentUser ? <FormLogin callback={setCurrentUser.bind(null, true)} /> : <p>{currentUser}, <ButtonLogout callback={setCurrentUser.bind(null, false)} /></p>}
    </nav>
  );
};

export default SiteHeader
