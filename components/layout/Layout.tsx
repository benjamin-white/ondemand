import React, { ReactNode } from 'react'
import SiteHeader           from '../site-header/SiteHeader'
import styles               from './Layout.module.css'

type User = {
  name: string
}

type Props = {
  children: ReactNode,
  user: User
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <SiteHeader user={props.user} />
    <div className={styles.layout}>{props.children}</div>
  </div>
);

export default Layout;