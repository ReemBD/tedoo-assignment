import { PropsWithChildren } from 'react';
import { Icon } from '../../../common/components/icon/icon.component';
import { AppIcon, AppIconSize } from '../../../common/models/app-icon.model';
import { Logo } from '../logo/logo.component';
import { Avatar } from '../../../common/components/avatar/avatar.component';
import { AvatarSize } from '../../../common/models/avatar.model';
import './app-header.component.scss';

export const AppHeader = () => {
    return (
        <header className='app-header main-layout full'>
            <div className='flex space-between'>
                <div className="left-side-container flex align-center">
                    <div className='main-header-logo'>
                        <Logo />
                    </div>
                    <div className="search-bar flex">
                        <Icon name={AppIcon.Search} size={AppIconSize.Small} />
                        <input placeholder='Search' type='text' className='search-input' />
                    </div>
                </div>
                <div className="right-side-container flex align-center full-height">
                    <nav className='main-header-nav flex align-center full-height'>
                        <ul className='main-nav flex full-height'>
                            <_NavItem active iconName={AppIcon.Home}>Home</_NavItem>
                            <_NavItem iconName={AppIcon.MessageCircle}>Messaging</_NavItem>
                            <_NavItem iconName={AppIcon.Bell}>Notifications</_NavItem>
                        </ul>
                    </nav>
                    <Avatar src='https://images.tedooo.com/biz/6318e42f1e092fadca580648/d1d767f5-8956-4ad4-9ed8-30ee923bc6b2.jpg' size={AvatarSize.Medium} />
                </div>
            </div>
        </header>
    );
};

const _NavItem = ({
    iconName,
    children,
    active,
}: PropsWithChildren<{ iconName: AppIcon, active?: boolean }>) => {
    return (
        <li className={`nav-item flex align-center full-height ${active ? 'active' : ''}`}>
            <a className='flex align-center' href='#'>
                <Icon name={iconName} size={AppIconSize.Small} />
                <span>{children}</span>
            </a>
        </li>
    );
};
