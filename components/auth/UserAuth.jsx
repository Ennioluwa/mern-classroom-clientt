import axios from 'axios'

export default function UserAuth(gssp) {
  return async (context) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_NAME}/api/user`,
        {
          headers: {
            cookie: context.req.headers.cookie,
            contentType: 'application/json',
          },
        }
      )
      if (!data) {
        console.log('user auth')
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        }
      }
      if (gssp) {
        const gsspData = await gssp(context)
        return {
          props: {
            ...gsspData.props,
            user: data || null,
          },
        }
      }
      return {
        props: {
          user: data || null,
        },
      }
    } catch (error) {
      console.log(error)
      return {
        props: { error: 'error' },
      }
    }
  }
}
