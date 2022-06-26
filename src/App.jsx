import "./style.css"
import shuffle from "./shuffle.svg"
import { Movie } from "./Movie"
import axios from "axios"
import { useState } from "react"

export const App = () => {
    const [movieData, setMovieData] = useState({})
    const [movieState, setMovieState] = useState(false)

    const generateNum = () =>{
        const num = Math.floor(Math.random()*1000)
        return num
    }

    async function fetchMovie(url, key, language){
        try{
            const result = await axios.get(`${url}${generateNum()}?${key}&${language}`)
            const data = await result.data
     
            if(data.overview === ""){
                throw new Error
            }
            const movie = {
             title: data.title,
             desc: data.overview,
             poster: `${import.meta.env.VITE_IMG_URL}${data.poster_path}`
            }
            setMovieState(true)
            setMovieData(movie)
        }catch(e){
            fetchMovie(url, key, language)
        }
       
    }

    return (
        <div className="flex flex-col items-center mt-32 mx-auto h-screen w-2/4 ">
            <img src={shuffle} alt="" width="90px" className="mb-4" />
            <h1 className="text-white font-bold text-4xl text-center">Não sabe o que assistir?</h1>
            {movieState ? <Movie poster={movieData.poster} title={movieData.title} desc={movieData.desc}/> : <></>}
           
            <button onClick={() => fetchMovie(import.meta.env.VITE_BASE_URL, import.meta.env.VITE_API_KEY, import.meta.env.VITE_LANGUAGE)}>
                <img src={shuffle} alt="" width="30px" />
                <strong className="text-sm">Encontrar filme</strong>

            </button>
            <p className="text-white text-center mt-4 mb-12">Clique em "Encontrar filme" que traremos informações <br />
                de algum filme para você assistir hoje.</p>
        </div>

    )
}