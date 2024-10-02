import { getIconPath } from "../../helpers/path.helper"
import { AppIcon, AppIconSize } from "../../models/app-icon.model"
import './icon.component.scss'

interface Props {
    name: AppIcon;
    size: AppIconSize;
    className?: string;
}

export const Icon = ({ name, size, className }: Props) => {
    return <div className={`icon icon-${size} ${className || ''}`}>
        <img src={getIconPath(name)} alt="icon" />
    </div>
}