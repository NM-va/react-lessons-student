import { 
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Select, MenuItem, FormControl, InputLabel,
  Button, Box 
} from '@mui/material';
import { boolean } from 'zod';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ open, onClose, onSubmit }) => {
  // TODO: Состояние формы
  // TODO: Валидация
  // TODO: Обработка отправки


  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* TODO: Реализуйте форму */}
      <DialogTitle>Создать таску</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={onSubmit}>
            <TextField label="Название таски" name='nameTask' required/>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button type='submit'>Создать</Button>
        <Button>Отменить</Button>
      </DialogActions>
    </Dialog>
  );
};