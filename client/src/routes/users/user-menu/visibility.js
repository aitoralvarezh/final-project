import { useUser } from "../../../usercontext";
import { articleVisibility } from "../../../api"
import { useState } from "react";

function VisibilityButton({ article }) {
    const { token } = useUser();
    const [visible, setvisible] = useState(!!article.visible);

    console.log(visible);

    const handleChange = async () => {
        if (visible) {
            setvisible(false);
        }
        else {
            setvisible(true)
        }
        await articleVisibility(token, visible, article.id);
    }
    return (
        <label
            key={visible}
        >{visible}
            <input
                type="checkbox"
                name="visible"
                checked={visible}
                onChange={handleChange}
            />
        </label>
    )
}

export default VisibilityButton;