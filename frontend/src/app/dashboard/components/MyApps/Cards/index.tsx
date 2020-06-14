// Dependencies
import React, { FC, ReactElement, useState, memo } from 'react'
import { Icon } from 'fogg-ui'

// Constants
import { STAGE_LINK } from '@constants/links'

// Components
import Link from '@ui/Link'
import CreateAppModal from '@dashboard/components/Modals/CreateAppModal'
import AppIcon from '@layouts/main/AppIcon'

// Styles
import styles from './Cards.scss'

// Interfaces
interface iProps {
  items: any[]
  router: any
}

const Cards: FC<iProps> = ({ items, router }): ReactElement => {
  // Local state
  const [isOpen, setIsOpen] = useState(false)
  const title = 'My Apps'

  // Method to open modal
  const handleModal = (): void => setIsOpen(!isOpen)

  return (
    <>
      <CreateAppModal
        label="Create new App"
        isOpen={isOpen}
        onClose={handleModal}
        options={{
          position: 'center',
          width: '400px'
        }}
      />

      <section className={styles.cards}>
        <h1>{title}</h1>

        <ul>
          {items.map(app => {
            router.appId = app.id

            return (
              <li key={app.id}>
                <Link as={STAGE_LINK(router).as} href={STAGE_LINK(router).href}>
                  <section className={styles.card} title={app.description}>
                    <AppIcon app={app} />
                  </section>
                </Link>
              </li>
            )
          })}

          <li>
            <section className={styles.card} onClick={handleModal}>
              <section className={styles.app}>
                <Icon type="fas fa-plus" />
              </section>

              <span className={styles.createNewApp}>Create New App</span>
            </section>
          </li>
        </ul>
      </section>
    </>
  )
}

export default memo(Cards)