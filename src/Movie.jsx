
export const Movie = (props) => {
    return(
        <div className="flex flex-col items-center gap-6 my-12 md:flex-row ">
            <img src={props.poster} alt="Movie poster" width="171px"/>
            <div className="text-white">
                <h2 className="font-bold text-xl mb-4 text-center md:text-left">{props.title}</h2>
                <p className="text-center md:text-left">{props.desc}</p>
            </div>
        </div>
    )
}