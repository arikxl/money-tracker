
import Image from 'next/image'
import { ImStatsBars } from 'react-icons/im';

const AppHeader = () => {

    const user = {
        name: 'Arik'
    }

  return (
      <header className='container max-w-2xl px-6 py-6 mx-auto   flex justify-between items-center'>
          <div className='flex items-center gap-2'>
              <Image src={`https://robohash.org/${user.name}1?set=set4`}
                alt={ user.name} width='40' height='40'
                className='rounded-full bg-red-300'
              />
              <small>Hi, {user.name }!</small>
          </div>
          <nav className='flex items-center gap-4'>
              <div>
                  <ImStatsBars className='text-2xl'/>
              </div>
              <div>
                  <button className='btn btn-danger'>Sign Out</button>
              </div>
          </nav>
    </header>
  )
}

export default AppHeader