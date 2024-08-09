import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { taskSheetOpenState, selectedStatusState, Status } from '@/store/atom';

interface AddTaskButtonProps {
    status?: Status;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ status }) => {
    const setIsTaskSheetOpen = useSetRecoilState(taskSheetOpenState);
    const setSelectedStatus = useSetRecoilState(selectedStatusState);

    const handleClick = () => {
        if (status) {
            setSelectedStatus(status);
        }
        setIsTaskSheetOpen(true);
    }
    return (
        <Button onClick={handleClick} variant="default" className="w-full mt-2 transition-colors" >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
        </Button>
    );
};

export default AddTaskButton;