export default function OneTimer({ number, end }) {
    if (number % 2 === 1) {
        return (<>
            <span className="style_flipUnit__9sYOw">
                <span className="style_upperCard__N7NxB">
                    <span className="notranslate">
                        {number}
                    </span>
                </span>
                <span className="style_lowerCard__m7sNT">
                    <span className="notranslate">
                        {number < end ? number + 1 : 0}
                    </span>
                </span>
                <span className="style_flipCard__0DOgE style_unfold__YFeCf">
                    <span className="notranslate">
                        {number}
                    </span>
                </span>
                <span className="style_flipCard__0DOgE style_fold__yqgW0">
                    <span className="notranslate">
                        {number < end ? number + 1 : 0}
                    </span>
                </span>
            </span>
        </>)
    } else {
        return (<>
            <span className="style_flipUnit__9sYOw">
                <span className="style_upperCard__N7NxB">
                    <span className="notranslate">
                        {number}
                    </span>
                </span>
                <span className="style_lowerCard__m7sNT">
                    <span className="notranslate">
                        {number < end ? number + 1 : 0}
                    </span>
                </span>
                <span className="style_flipCard__0DOgE style_fold__yqgW0">
                    <span className="notranslate">
                        {number < end ? number + 1 : 0}
                    </span>
                </span>
                <span className="style_flipCard__0DOgE style_unfold__YFeCf">
                    <span className="notranslate">
                        {number}
                    </span>
                </span>
            </span>
        </>)
    }
}