

type SubtitleProps = {
    text: string
}

const Subtitle=({text}:SubtitleProps) => {
    return(
        <h3 className="text-center text-2xl text-green-700 my-4">{text}</h3>
    )
}

export default Subtitle