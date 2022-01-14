import styles       from './DashboardUser.module.css'
import { UserType } from '../../inc/user'

const DashboardUser = ({ user }: {user: UserType}) => {

  return (
    <section className={styles.dashboard}>
      { user.name }
      <div>Account managment fields here</div>
    </section>
  )

}

export default DashboardUser