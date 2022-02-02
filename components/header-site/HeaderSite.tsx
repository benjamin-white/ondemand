import React, { useState } from 'react'
import Link                from 'next/link'
import { useRouter }       from 'next/router'
import FormLogin           from '../form-user-login/FormLogin'
import ButtonLogout        from '../button-logout/ButtonLogout'
import styles              from './HeaderSite.module.css'

type User = {
  name: string
}

type props = {
  user: User|null
}

const HeaderSite: React.FC<props> = ({ user }) => {

  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const [currentUser, setCurrentUser] = useState(user)

  return (
    <nav className={styles.header}>
      <div>
        <Link href="/">
          <a data-active={isActive("/")} className={isActive('/') ? styles.disabled : ''}>Home</a>
        </Link>
        <Link href="/account">
          <a data-active={isActive("/account")} className={isActive('/account') ? styles.disabled : ''}>Account</a>
        </Link>
        <Link href="/create">
          <a data-active={isActive("/create")} className={isActive('/create') ? styles.disabled : ''}>Create</a>
        </Link>
      </div>
      {!currentUser ? <FormLogin callback={setCurrentUser.bind(null, true)} /> : <p>{currentUser.name}, <ButtonLogout callback={setCurrentUser.bind(null, false)} /></p>}
    </nav>
  );
};

export default HeaderSite
