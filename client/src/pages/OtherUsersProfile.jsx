import React from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import useGetBackendQueries from '../Hooks/useGetBackendQueries';
import PublicationsCard from '../components/Cards/PublicationsCard';
import LoadingPublications from '../Hooks/LoadingPublications';
import OtherUserInfo from '../components/OtherUserInfo';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const OtherUsersProfile = () => {  

    const [userPublications, setUserPublications] = useState([])
    const [userName, setUserName] = useState(null)
    const [quantityPublications, setQuantityPublications] = useState(0)
    const [profileImage, setProfileImage] = useState("")
    const [userPublicationsFavories, setUserPublicationFavorites] = useState([])
    const [quantityFavorites, setQuantityFavorites] = useState(0)
    const [userBirthdate, setUserBirthdate] = useState("")
    const [userLocation, setUserLocation] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [load, setLoad] = useState(true)
    const [showFavorites, setShowFavorites] = useState(false)
    const [showUserPublications, setShowUserPublications] = useState(true)

    const {userId} = useParams()

    const { data, loading } = useGetBackendQueries(`getUserPublication/${userId}`); 
    const { data: userData } = useGetBackendQueries(`getUserData/${userId}`); 
    const { data: userFavs } = useGetBackendQueries(`getMyFavs/${userId}`); 

  

    useEffect(() => { 
        setUserPublications(data)
        setQuantityFavorites(userFavs.length)
        setUserPublicationFavorites(userFavs)
        setQuantityPublications(data.length)
        setProfileImage(userData.map((u) => u.profileImage))
        setUserLocation(userData.map((u) => u.location))
        setUserName(userData.map((d) => d.name))
        setUserBirthdate(userData.map((d) => d.birthdate))
        setUserEmail(userData.map((d) => d.email))
        setTimeout(() => { 
            setLoad(false)
            console.log(profileImage)
        }, 2000)
    }, [data])

    const viewFavorites = () => { 
        setShowFavorites(true)
        setShowUserPublications(false)
    }

    const viewPublications = () => { 
        setShowFavorites(false)
        setShowUserPublications(true)
    }



  return (
        <div className='mt-24 md:mt-22 xl:mt-12 overflow-auto max-h-[4910px] xxs:max-h-[540px] sm:max-h-[470px] lg:max-h-[550px] 2xl:max-h-[750px] border'>
               {load ? (
                <LoadingPublications text={`${userName} data..`}/>
                   ) : (
                userPublications.length !== 0 ? (
                <div className='flex flex-col jusitfy-center mt-4 m-2 md:flex-row md:mt-6 lg:m-6'>

                    <div className="">
                        <OtherUserInfo 
                        quantity={quantityPublications} 
                        photo={profileImage} 
                        name={userName} 
                        favorites={quantityFavorites}
                        birthdate={userBirthdate}
                        email={userEmail}
                        location={userLocation}
                        openFavs={viewFavorites}
                        openPublications={viewPublications}
                        />
                    </div>

                  {showUserPublications ?  
                      <div className='ml-2 md:ml-12 flex flex-col items-center justify-center'>
                         <div className='flex flex-col justify-center items-center mt-6 md:mt-12'>
                              <small className='font-bold text-black text-sm'> Publications</small>
                              <KeyboardArrowDownIcon/>
                         </div> 
                         <div className='border overflow-auto max-h-[550px]'>
                           {userPublications.map((p) => <PublicationsCard pub={p} />)}          
                         </div>                  
                      </div> 
                      : 
                      null}

                    {showFavorites ? 
                        <div className='ml-2 md:ml-12 flex flex-col items-center justify-center'>
                            <div className='flex flex-col  justify-center items-center mt-8 md:mt-12'>
                              <small className='font-bold text-black text-sm'> Favorites Publications</small>
                              <KeyboardArrowDownIcon/>
                            </div>
                            {userFavs.length === 0 ? (
                                <div className='flex flex-col items-center justify-center mt-12'>
                                     <p className='text-sm font-bold'>At the Moment, {userName} has not favorites.</p>
                                </div>
                           
                                ) : (
                                    <div className='border overflow-auto max-h-[550px]'>
                                        {userPublicationsFavories.map((p) => <PublicationsCard pub={p} />)}
                                     </div>
                                )}
                        </div> 
                        : 
                    null}

                   </div>               
                    ) : (
                    <small>{userName} has not Publications yet..`</small>
                    )
            )}
       </div>
  )
}

export default OtherUsersProfile
