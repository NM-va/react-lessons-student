import cls from './ProgressBar.module.css';

interface Props {
    progress: number;
}

export const ProgressBar = (props: Props) => {
    const { progress } = props;
    
    return (
        <div className={`${cls.progressContainer}`}>
            <div className={`${cls.progressBar}`} style={{ width: `${progress}%` }}></div>
        </div>
    )
}