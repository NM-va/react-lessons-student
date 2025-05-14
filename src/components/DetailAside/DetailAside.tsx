import cls from './DetailAside.module.css';
import { FooterActions, FooterActionsProps } from '../FooterActions/FooterActions';
import { HeadDetail, HeadDetailProps } from '../HeadDetail/HeadDetail';
import { JSX } from 'react';


export interface DetailAsideProps<T = string> {
    headProps?: HeadDetailProps<T>;
    children?: JSX.Element | React.ReactElement | React.ReactNode;
    footerProps?: FooterActionsProps;
}

export function DetailAside<T = string>({ headProps, children, footerProps }: DetailAsideProps<T>): JSX.Element {
    return (
        <div className={cls.detailAside}>
            {headProps && <HeadDetail<T> {...headProps} />}
            
            <div className={cls.asideContent}>{children}</div>
    
            {footerProps && <FooterActions {...footerProps} />}
        </div>
    );
};