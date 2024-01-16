
import Link from "helpers/Link"
const Photos = ({ section }) => {
    const width = 100 / section.photos.length
    return (
        <>
            <div>
                <div className="relative after:clear-both after:table" style={{ paddingTop: "20px" }}>
                    {section.photos.map((photo, index) => {
                        return (
                            <Link className="cursor-pointer" style={{ float: "left", width: `${width}%`, padding: (photo.hasPadding ? photo.padding : 0) }}  href={photo.link_to} key={index} >
                                <img src={photo.file_path} alt="热销新品2坑" className="w-full" />
                            </Link>)
                    })}
                </div>
            </div>
        </>
    )
}

export default Photos