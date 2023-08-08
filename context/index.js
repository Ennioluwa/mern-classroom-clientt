import axios from 'axios'
import { useRouter } from 'next/router'

const { createContext, useReducer, useEffect, useContext } = require('react')

const initialState = {
  user: null,
}

const UserContext = createContext()

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN': {
      window.localStorage.setItem('user', JSON.stringify(action.payload))
      return { ...state, user: action.payload }
    }
    case 'UPDATE': {
      window.localStorage.setItem('user', JSON.stringify(action.payload))
      return { ...state, user: action.payload }
    }
    case 'LOGOUT': {
      window.localStorage.removeItem('user')
      return { ...state, user: null }
    }
    default: {
      return state
    }
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState)
  axios.defaults.withCredentials = true
  const router = useRouter()
  useEffect(async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_APP_NAME}/api/user`)
      .then(({ data }) => {
        dispatch({
          type: 'LOGIN',
          payload: JSON.parse(window.localStorage.getItem('user')) || data,
        })
      })
      .catch(({ response }) => {
        dispatch({ type: 'LOGOUT' })
      })
  }, [])
  // axios.interceptors.response.use(
  //   function (response) {
  //     // any status code that lie within the range of 2XX cause this function
  //     // to trigger
  //     return response
  //   },
  //   function (error) {
  //     // any status codes that falls outside the range of 2xx cause this function
  //     // to trigger
  //     let res = error.response
  //     if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
  //       return new Promise((resolve, reject) => {
  //         axios
  //           .get(`${process.env.NEXT_PUBLIC_APP_NAME}/api/signout`)
  //           .then((data) => {
  //             dispatch({ type: 'LOGOUT' })
  //             router.push('/login')
  //           })
  //           .catch((err) => {
  //             console.log('AXIOS INTERCEPTORS ERR', err)
  //             reject(error)
  //           })
  //       })
  //     }
  //     return Promise.reject(error)
  //   }
  // )
  // useEffect(() => {
  //   const getCsrfToken = async () => {
  //     const { data } = await axios.get(
  //       `${process.env.NEXT_PUBLIC_APP_NAME}/api/csrf-token`
  //     )
  //     // console.log("CSRF", data);
  //     axios.defaults.headers['X-CSRF-Token'] = data.getCsrfToken
  //   }
  //   getCsrfToken()
  // }, [])

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within UserContext')
  }
  return context
}
export default useUser
