import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { UserContext } from '../../context'

const UserRoute = ({ children }) => {
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext)
  // state
  const [ok, setOk] = useState(true)
  // router
  const router = useRouter()

  useEffect(() => {
    axios.defaults.withCredentials = true
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_NAME}/api/user`
      )
      //   console.log(data);
      if (data.ok) setOk(true)
    } catch (err) {
      dispatch({ type: 'LOGOUT' })
      window.localStorage.removeItem('user')
      console.log('iuiop')
      router.push('/login')

      console.log(err)
    }
  }

  return <>{!ok ? <h2>Loading...</h2> : <>{children}</>}</>
}

export default UserRoute
