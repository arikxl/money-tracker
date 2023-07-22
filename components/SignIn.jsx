
import { authContext } from '@/store/auth-context'
import { useContext } from 'react'
import {FcGoogle} from 'react-icons/fc'
const SignIn = () => {

    const { googleLoginHandler } = useContext(authContext)

  return (
      <main className='container max-w-2xl px-6 mx-auto'>
          <h1 className='mb-6 font-bold text-6xl text-center'>Welcome👋</h1>

          <div className='flex flex-col overflow-hidden shadow-md
           shadow-slate-500 bg-slate-800 rounded-2xl'>
              <div className='h-52'>
                  {/* <Image
                      className='object-cover w-full h-full'
                      src='https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg'
                      alt='money' 
                  /> */}
                  <img
                      className='object-cover w-full h-full'
                      src='https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg'
                      alt='money' />
              </div>

              <div className='px-4 py-4' >
                <h3 className='text-2xl text-center'>Please sign in to continue</h3>
                  <button className='flex self-start gap-2 mx-auto mt-6 font-medium
                  text-white align-middle bg-slate-700 rounded-lg p-3'
                      onClick={googleLoginHandler}
                  >
                      <FcGoogle className='text-2xl'/>
                      Google
                  </button>
              </div>
          </div>
      </main>
  )
}

export default SignIn