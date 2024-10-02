
import { AvatarSize } from "../../models/avatar.model";
import "./avatar.component.scss";

interface Props {
    src: string;
    size: AvatarSize;
}

export const Avatar = ({ src, size }: Props) => {
    return <div className={`avatar avatar-${size || AvatarSize.Medium}`}>
        <img src={src} alt="avatar" />
    </div>
}