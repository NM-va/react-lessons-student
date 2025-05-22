import { JSX,  useState } from 'react';
import cls from './Head.module.css'
import { Tabs } from '../Tabs/Tabs';

export interface HeadDetailProps<T = string> {
    title?: string;
    description?: string;
    onClose?: () => void;
    menuActions?: HeadDetailAction<T>[];

    tabs?: TabItem[]; // todo создать интерфейс для Action
    selectedTab?: string;
    onTabChange?: (tab: string) => void;
    content?: JSX.Element | React.ReactNode;
}

export interface HeadDetailAction<T = string> {
    key: T;
    label: string;
    icon?: string;
    onAction?: (value: T) => void;
}

export interface TabItem<K = string> {
    key: K;
    label: string;
    icon: string;
    disabled?: boolean;
}

export function HeadDetail<T = string>(props: HeadDetailProps<T>){
    const {title, description, onClose, menuActions, tabs, selectedTab, onTabChange, content} = props;
    
    const [isShowMenu, setShowMenu] = useState<boolean>(false);
    
    
    const toggleMenu = () => {
        setShowMenu(!isShowMenu);
    };
    
    return (
        <div className={`${cls.head}`}>
            <div className={`${cls.controls}`}>
                {isShowMenu && <ul className={cls.dropdown}>
                    {
                        menuActions?.map((item) => {
                            return (
                                <li>
                                    <button onClick={() => item?.onAction?.(item.key)} key={`${item.key}`}>
                                        {item.label}
                                    </button>
                                </li>
                            )
                        })
                        //todo сделать menu по клику на три точки
                    }
                </ul>}
            

                //todo вставить content
                {content}
                
                <div>
                    <button onClick={toggleMenu}>Открыть меню ...</button>
                </div>

                {onClose && (
                    <button onClick={onClose} key={`close-head`} className={`${cls.close}`}>
                        <img src={'/close.svg'} style={{ width: 20 }} />
                    </button>
                )}
    
                {tabs && <Tabs tabs={tabs} selectedTab={selectedTab || ''} onTabChange={onTabChange} />}
            </div>
            <h2>{title}</h2>
            <h4>{description}</h4>
        </div>
    )
};
