import { JSX } from 'react';
import cls from './Head.module.css'

export interface HeadDetailProps<T = string, K = string> {
    title?: string;
    description?: string;
    onClose?: () => void;
    menuActions?: HeadDetailAction<T>[];

    tabs?: any[]; // todo создать интерфейс для Action
    selectedTab?: K;
    onTabChange?: (tab: K) => void;
    content?: JSX.Element | React.ReactNode;
}

export interface HeadDetailAction<T = string> {
    key: T;
    label: string;
    icon?: string;
    onAction?: (value: T) => void;
}

export function HeadDetail<T = string>(props: HeadDetailProps<T>){
    const {title, description, onClose, menuActions} = props;

    return (
        <div className={`${cls.head}`}>
            <div className={`${cls.controls}`}>
                {
                    menuActions?.map((item) => {
                        return (
                            <button onClick={() => item?.onAction?.(item.key)} key={`${item.key}`}>
                                {item.label}
                            </button>
                        )
                    })
                    //todo сделать menu по клику на три точки
                }

                //todo вставить content

                <button>Открыть меню ...</button>

                {onClose && (
                    <button onClick={onClose} key={`close-head`} className={`${cls.close}`}>
                        <img src={'/close.svg'} style={{ width: 20 }} />
                    </button>
                )}
            </div>
            <h2>{title}</h2>
            <h4>{description}</h4>
        </div>
    )
};
