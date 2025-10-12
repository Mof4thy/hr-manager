import Button from '../components/button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Authcontext'
import { useEffect, useState } from 'react'

const Profile = ()=>{
    
    const { handleLogout, useGetProfile } = useAuth()
    const navigate = useNavigate()

    const handleLogoutClick = async () => {
        try {
            await handleLogout()
            navigate('/login')
        } catch (error) {
            console.log(error)
        }   
    }


    const { data: user , isLoading , isError } = useGetProfile()
    const [userData, setUserData] = useState(null)

    useEffect(()=>{
        
        const userData = user?.data?.user
        setUserData(userData)
        
    },[user])




    return(
        <>
            {isLoading && <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>}
            {isError && <div className="w-full h-full flex items-center justify-center">
                <div className="text-red-500">Error loading profile</div>
            </div>}
            
            {userData && (
            <div className="w-full flex flex-col items-center justify-center gap-8">
                
                <div className=" flex items-center justify-between w-full">
                    <div className="flex flex-col">
                        <h2 className="text-4xl text-slate-950 font-bold">HR Profile</h2>
                        <h4 className="text-lg text-gray-500">Manage your account information and settings</h4>
                    </div>

                    
                </div>

                <div className=' w-full flex flex-col md:flex-row gap-6 '>

                    <div className='flex-1 border-1 border-gray-400 shadow-lg p-6 rounded-2xl bg-white flex flex-col justify-center gap-4'>

                        <h2 className='text-lg'>Personal Information</h2>

                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 p-6 ">
                            {/* Left column */}
                            <div className="flex flex-col gap-4 md:gap-8  flex-1">
                                <div className="flex flex-col">
                                    <h4 className="text-lg font-bold">Full Name:</h4>
                                    <h4 className="text-md font-semibold">{userData.fullName}</h4>
                                </div>

                                <div className="flex flex-col">
                                    <h4 className="text-lg font-bold">Email Address:</h4>
                                    <h4 className="text-md font-semibold">{userData.email}</h4>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 md:gap-8 flex-1">
                                <div className="flex flex-col w-fit">
                                    <h4 className="text-lg font-bold">Role</h4>
                                    <h4 className="text-sm py-1 px-3 bg-slate-900 text-white rounded-lg">
                                        {userData.role}
                                    </h4>
                                </div>

                                <div className="flex flex-col">
                                        <h4 className="text-lg font-bold">Is Active</h4>
                                        <h4 className="text-md">{userData.isActive ? 'Active' : 'Inactive'}</h4>
                                </div>
                                
                            </div>

                            <div className="flex flex-col gap-4 md:gap-8 flex-1 justify-between">
                               
                                <button className='w-fit py-2 px-4 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600' onClick={handleLogoutClick}>Logout</button>
                        
                            </div>
                        </div>

                        <dialog>
                            {/* change password */}
                        </dialog>

                    </div>
                </div>


            </div>
            )}
            
        </>
    )


}


export default Profile  