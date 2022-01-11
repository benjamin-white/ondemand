import React, { useState } from 'react'
import Link                from 'next/link'
import { useRouter }       from 'next/router'
import FormLogin           from './account/FormLogin'
import ButtonLogout        from './account/ButtonLogout'
import styles              from './Header.module.css'
// import { userInfo }        from 'os'

type User = {
  name: string
}

type props = {
  user: User
}

const Header: React.FC<props> = ({ user }) => {

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

export default Header
