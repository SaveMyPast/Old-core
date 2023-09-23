import { AddPromptData } from '../interfaces/interfaces'
import { auth } from '../firebase'
import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { firestore } from '../firebase'

const useAdminAddPrompt = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const adminAddPrompt = async (promptData: AddPromptData) => {
    setLoading(true)

    if (!auth.currentUser) {
      throw new Error('User not logged in')
    }
    await addDoc(collection(firestore, 'prompts'), promptData)
      .then(() => {
        setSuccess(true)
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
  }

  return [adminAddPrompt, success, error, loading] as const
}

export default useAdminAddPrompt
