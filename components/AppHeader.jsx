import Image from 'next/image'
import { useContext } from 'react';
import { ImStatsBars } from 'react-icons/im';

import { authContext } from '@/store/auth-context';

const AppHeader = () => {

    const { user, loading, logout,  } = useContext(authContext);

    return (
        <header className='container max-w-2xl px-6 py-6 mx-auto
         flex justify-between items-center'>
            {user && !loading && (
                <div className='flex items-center gap-2'>
                    <Image src={user.photoURL}
                        alt={user.displayName} width='40' height='40'
                        className='rounded-full bg-red-300'
                        referrerPolicy='no-referrer'
                    />
                    <small>Hi, {user.displayName}!</small>
                </div>
            )}

            {user && !loading && (
                <nav className='flex items-center gap-4'>
                    <div>
                        <a href='#stats'>
                        <ImStatsBars className='text-2xl' />
                        </a>
                    </div>
                    <div>
                        <button onClick={logout} className='btn btn-danger'>Sign Out</button>
                    </div>
                </nav>
            )}

        </header>
    )
}

export default AppHeader