import cls from './DetailAside.module.css';
import { FooterActions, FooterActionsProps } from '../FooterActions/FooterActions';
import { HeadDetail, HeadDetailProps } from '../HeadDetail/HeadDetail';



export interface DetailAsideProps<T = string> {
    headProps?: HeadDetailProps<T>;
    children?: JSX.Element;
    footerProps?: FooterActionsProps;
}

export const DetailAside = ({ headProps, children, footerProps }: DetailAsideProps) => {
    return (
        <div className={cls.detailAside}>
            {headProps && <HeadDetail {...headProps} />}
            
            <div className={cls.asideContent}>{children}</div>
    
            {footerProps && <FooterActions {...footerProps} />}
        </div>
    );
};