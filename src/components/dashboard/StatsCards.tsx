import { Grid, Card, CardContent, Typography, Box, Stack } from '@mui/material';
import { Assignment, CheckCircle, Schedule, Warning } from '@mui/icons-material';

interface StatsCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
}

interface StatsCard {
    id: number;
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
}

const statsCardsData: StatsCardProps[] = [
    {
        title: "Новых заданий",
        value: 24,
        icon: <Assignment fontSize="large" />,
        color: "primary.main",
    },
    {
        title: "Выполнено",
        value: 18,
        icon: <CheckCircle fontSize="large" />,
        color: "success.main",
    },
    {
        title: "В процессе",
        value: 6,
        icon: <Schedule fontSize="large" />,
        color: "warning.main",
    },
    {
        title: "Просрочено",
        value: 3,
        icon: <Warning fontSize="large" />,
        color: "error.main",
    }
];

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color }) => {
// Done: Реализуйте карточку статистики
    return (
        <Card>
            <CardContent>
                {icon}
                <Typography>{title}</Typography>
                <Typography color={color}>{value}</Typography>
            </CardContent>
        </Card>
    )
};

export const StatsCards: React.FC = () => {
// TODO: Получите данные статистики
// Done: Создайте массив карточек
// Done: Отрендерите Grid с карточками

    return (
        <Grid container spacing={2}>
            {
                statsCardsData.map((card: StatsCardProps, index: number) => (
                    <Grid>
                        <StatsCard 
                            key={index}
                            title={card.title}
                            value={card.value}
                            icon={card.icon}
                            color={card.color}
                        />
                    </Grid>
                ))
            }
        </Grid>
    )
};