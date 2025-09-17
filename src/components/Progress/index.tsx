import { Box, CircularProgress } from "@mui/material";
import { JSX } from "react";

export interface Props {
    loading?: boolean;
    children?: JSX.Element | JSX.Element[];
    style?: React.CSSProperties;
    className?: string;
    size?: number;
}

export function Progress(props: Props) {
    return (
        <Box>
            {props.children}
            <Box className="progress__preloader">
                <CircularProgress />
            </Box>
        </Box>
    )
}