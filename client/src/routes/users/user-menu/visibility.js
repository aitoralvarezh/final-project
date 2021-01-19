import { useUser } from "../../../usercontext";
import { articleVisibility } from "../../../api"
import { useState } from "react";

function VisibilityButton({ article }) {
    const { token } = useUser();
    const [visible, setvisible] = useState(!!article.visible);

    const handleChange = async () => {
        setvisible(!visible)
        await articleVisibility(token, !visible, article.id);
    }
    const checkStyle = (visible ? 'public' : 'private')

    return (
        <label>
            <div className={'visibility-choice ' + checkStyle} />
            <input
                className="hide"
                type="checkbox"
                name="visible"
                checked={visible}
                onChange={handleChange}
            />
        </label>
    )
}

export default VisibilityButton;