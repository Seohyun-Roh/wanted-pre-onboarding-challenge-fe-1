/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Dispatch, MouseEventHandler, ReactNode, SetStateAction, useEffect } from 'react'

import { Close } from 'assets/svgs'
import styles from './modal.module.scss'

interface Props {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

export const Modal = ({ isModalOpen, setIsModalOpen, children }: Props) => {
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  const handleCloseClick = () => {
    setIsModalOpen(false)
  }

  const handleModalClick: MouseEventHandler = (e) => {
    e.stopPropagation()
  }

  return (
    <div onClick={handleCloseClick} className={styles.modalContainer}>
      <div onClick={handleModalClick} className={styles.modal}>
        <button type='button' onClick={handleCloseClick} className={styles.closeButton}>
          <Close />
        </button>
        <div>{children}</div>
      </div>
    </div>
  )
}
