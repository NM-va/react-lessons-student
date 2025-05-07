import React, {
    createContext,
    useContext,
    forwardRef,
    useImperativeHandle,
    useState,
    ReactNode,
    RefAttributes,
    ForwardRefExoticComponent,
} from 'react';

// === Типы ===
export interface DataDetailProps {
    children: ReactNode;
    className?: string;
    title?: string;
    expanded?: boolean;
    onExpand?: (expanded: boolean) => void;
}

// === Контекст ===
interface DataDetailContextType {
    expanded: boolean;
    toggleExpand: () => void;
}

const DataDetailContext = createContext<DataDetailContextType | undefined>(undefined);

export const useDataDetail = () => {
    const context = useContext(DataDetailContext);
    if (!context) {
        throw new Error('useDataDetail must be used within a DataDetail component');
    }
    return context;
};

// === Императивный хэндл ===
export interface DataDetailHandles {
    open: () => void;
    close: () => void;
    toggle: () => void;
}

// === Подкомпоненты отдельно (определяются до основного компонента) ===

const Header: React.FC<{ children?: React.ReactNode, onClose: () => void }> = ({ children, onClose }) => {
    const { expanded, toggleExpand } = useDataDetail();

    return (
        <div onClick={toggleExpand} style={{ cursor: 'pointer', color: '#333' }}>
            <div onClick={onClose}>X</div>
            <strong>{children}</strong> ({expanded ? 'открыто' : 'закрыто'})
        </div>
    );
};

export const Body: React.FC<{ children?: React.ReactNode, expanded: boolean }> = ({ children, expanded }) => {
    return expanded ? <div style={{ marginLeft: 20, color: '#333' }}>{children}</div> : null;
};

const BodyWithContext: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const { expanded } = useDataDetail();
    return <Body expanded={expanded}>{children}</Body>
};

const Footer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return <div style={{ color: '#333' }}>{children}</div>;
};

const Actions: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return <div className="data-detail-actions">{children}</div>;
};

// === Основной компонент с forwardRef ===
type DataDetailType = ForwardRefExoticComponent<
    DataDetailProps & RefAttributes<DataDetailHandles>
> & {
    Header: React.FC<{ children?: React.ReactNode, onClose: () => void }>;
    Body: React.FC<{ children?: React.ReactNode }>;
    Footer: React.FC<{ children?: React.ReactNode }>;
    Actions: React.FC<{ children?: React.ReactNode }>;
};

const DataDetailBase = forwardRef<DataDetailHandles, DataDetailProps>((props, ref) => {
    const { title, ...otherProps } = props;
    // Локальное состояние
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        const newState = !expanded;
        setExpanded(newState);
        props.onExpand?.(newState);
    };

    const contextValue = {
        expanded,
        toggleExpand,
    };

    // Реализация императивного API
    useImperativeHandle(ref, () => ({
        open: () => {
            if (!expanded) {
                setExpanded(true);
                props.onExpand?.(true);
            }
        },
        close: () => {
            if (expanded) {
                setExpanded(false);
                props.onExpand?.(false);
            }
        },
        toggle: toggleExpand,
    }));



    return (
        <DataDetailContext.Provider value={contextValue}>
            {/* <Header onClose={() => console.log(`close`)}></Header> */}
            {otherProps.children}
        </DataDetailContext.Provider>
    );
});

// === Добавляем подкомпоненты как статические свойства ===
const DataDetail = DataDetailBase as DataDetailType;
DataDetail.Header = Header;
DataDetail.Body = BodyWithContext;
DataDetail.Footer = Footer;
DataDetail.Actions = Actions;

export { DataDetail };
export default DataDetail;