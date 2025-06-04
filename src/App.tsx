import { useEffect, useState } from 'react'
import ComposerInput, { type Mention } from './components/ComposerInput'

function App() {
  const [users, setUsers] = useState<Mention[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          'https://dummyjson.com/users?limit=10&select=id,username',
        )
        const data = await res.json()
        setUsers(data.users)
      } catch (e) {
        console.error('Failed to fetch users:', e)
      }
    }

    fetchUsers()
  }, [])

  return (
    <main className="mx-auto max-w-xl px-4 py-8">
      <ComposerInput mentionsList={users} />
    </main>
  )
}

export default App
