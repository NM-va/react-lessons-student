import React, { FC } from 'react';
import cls from './Footer.module.css';

export interface FooterActionsProps {
    actions?: FooterAction[];
    onAction?: (action: string) => void;
}

export interface FooterAction {
    key: string;
    label: string;
    primary?: boolean;
    disabled?: boolean;
}

export const FooterActions: FC<FooterActionsProps> = (props) =>  {
    const {actions, onAction} = props;
    
    if (actions?.length === 0) {
        return null;
    }
    
    return (
        <div className={`${cls.footer}`} >
            {
                actions?.map((item) => {
                    return (
                        <button className={`${cls.btn}`} key={item.key} disabled={item.disabled} onClick={() => onAction?.(item.key)}>{item.label}</button>
                    )
                })
            }
        </div>
    )
};