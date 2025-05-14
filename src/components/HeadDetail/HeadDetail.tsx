import React, { FC, SVGProps } from 'react';
// import CloseIcon  from '../../assets/close.svg'
import cls from './Head.module.css'

export interface HeadDetailProps<T = string> {
    title?: string;
    description?: string;
    onClose?: () => void;
    menuActions?: HeadDetailAction[];
}

export interface HeadDetailAction {
    key: string;
    label: string;
    icon?: string;
}

type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;

// const closeIcon: IconComponent = CloseIcon;

export const HeadDetail: FC<HeadDetailProps> = (props) => {
    const {title, description, onClose, menuActions} = props;
    
    //заменить этот компонент на компонент из любой библиотеки иконок
    // const Icon = ({ name }: string) => {
    //
    //     switch (name){
    //         case 'close':
    //             return closeIcon;
    //         default:
    //             return null;
    //     }
    //
    // }
    
    return (
        <div className={`${cls.head}`}>
            <div className={`${cls.controls}`}>
                {
                    menuActions?.map((item) => {
                        const btnClass = item.label.toLowerCase();
                        console.log('btnClass', btnClass)
                        
                        return (
                            <button onClick={onClose} key={item.key} className={`${cls[btnClass]}`}>
                                {/*{item?.icon ? <Icon path={item?.icon}/> : item.label}*/}
                                {/*<Icon name={item?.icon}/>*/}
                                x
                            </button>
                        )
                    })
                }
            </div>
            <h2>{title}</h2>
            <h4>{description}</h4>
        </div>
    )
};
