import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfoLocation from './InfoLocation';
import ResidentCard from './ResidentCard';

const Main = () => {

    const [location, setLocation] = useState({})
    const [searchLoc, setSearchLoc] = useState("")
    const [load, setLoad] = useState(true)

    useEffect(() => {
        const locId = Math.floor(Math.random() * 125) + 1
        axios.get(`https://rickandmortyapi.com/api/location/${locId}`)
            .then(res => {
                setLocation(res.data)
                setTimeout(() => {
                    setLoad(false)
                }, 1500)
            })
    }, [])

    const search = () => {
        setLoad(true)
        axios.get(`https://rickandmortyapi.com/api/location/${searchLoc}`)
            .then(res => {
                setLocation(res.data)
                setSearchLoc("")
                setTimeout(() => {
                    setLoad(false)
                }, 1000)
            })
    }

    return (
        <div className='main__contain'>
            <div className='input'>
                <input type="text"
                    value={searchLoc}
                    onChange={(e) => setSearchLoc(e.target.value)}
                    placeholder="type id" />
                <button onClick={search}>SEARCH</button>
            </div>
            {
                load ? <div className='load'><i className='bx bx-loader-circle bx-spin bx-lg' ></i></div> :
            <>
            <InfoLocation location={location} />

            <div className='residents__contain'>
                { location.residents[0] ? 
                    location.residents.map((resident) => (
                        <ResidentCard resident={resident} key={resident} />
                    )) :
                    <div className='no_population'>Population no found</div>
                }
            </div>
            </>
            }
        </div>
    );
};

export default Main;