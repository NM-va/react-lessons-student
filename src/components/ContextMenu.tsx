

export const ContextMenu = ({contextMenuParams}) => {
  
    const {visible, positionX, positionY} = contextMenuParams;
    
    const contextmenuList = ['Удалить', 'Пометить как выполненное'];
    
    return (
        <ul style={{
            opacity: visible ? '1' : '0',
            width: "300px",
            position: "absolute",
            top: visible ? `${positionY}px`: '-2000px',
            left: visible ? `${positionX}px`: '-2000px',
            listStyleType: "none",
            zIndex: "10",
            border: "1px solid var(--border-color)",
            backgroundColor: "var(--accent-color)",
            borderRadius: "8px",
            padding: "1.5rem",
    
        }}>
            {
                contextmenuList.map((item) => {
                    return <li style={{color: "var(--page-bg-color)", cursor: "pointer"}}>{item}</li>
                })
            }
        </ul>
    );
};