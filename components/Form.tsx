import React, { useState } from 'react'
import Router from 'next/router'
import styles from './Form.module.css'

const Form = () => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const submitFields = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const body = { title, content }
      await fetch('api/post', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })
      // await Router.push('/drafts')
    } catch (error) {
      console.error(error)
    }
  }
  
  return(
    <div>
    <form onSubmit={submitFields} className={styles.form}>
        <h1>New Draft</h1>
        <input
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          value={title}
        />
        <textarea
          cols={50}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={8}
          value={content}
        />
        <input disabled={!content || !title} type="submit" value="Create" />
        <a className={styles.back} href="#" onClick={() => Router.push('/')}>
          or Cancel
        </a>
      </form>
    </div>
  )
}

export default Form