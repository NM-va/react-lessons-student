export const ContextMenu = ({contextMenuParams}) => {
  
    const {visible, positionX, positionY} = contextMenuParams;
    
    const contextmenuList = ['Удалить', 'Пометить как выполненное'];
    
    return (
        <ul style={{
            visibility: `${visible}`,
            width: "300px",
            position: "absolute",
            top: `${positionY}px`,
            left: `${positionX}px`,
            listStyleType: "none",
            zIndex: "10",
            border: "1px solid var(--border-color)",
            backgroundColor: "var(--accent-color)",
            borderRadius: "8px",
            padding: "1.5rem"
    
        }}>
            {
                contextmenuList.map((item) => {
                    return <li style={{color: "var(--page-bg-color)", cursor: "pointer"}}>{item}</li>
                })
            }
        </ul>
    );
};