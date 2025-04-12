import { MutableRefObject, useState } from 'react';
import { toast } from 'sonner';

import { MAX_FOLDER_NAME_LENGTH } from '../config';

import { useCreateFolder } from './mutations/useCreateFolder';
import { useFolderStore } from './store/useFoldersStore';

type UseAddFolderProps = {
  isSubmittingRef: MutableRefObject<boolean>;
  closeModal: () => void;
};

export const useAddFolderModal = ({ isSubmittingRef, closeModal }: UseAddFolderProps) => {
  const [isAdd, setIsAdd] = useState<boolean>(false); // 추가하기 버튼 누름 여부
  const [newFolderName, setNewFolderName] = useState<string>(''); // 수정하려는 폴더의 새로운 이름

  const { addFolder } = useFolderStore();
  const { mutate: serverCreateFolder } = useCreateFolder(); // createFolder 함수와 로딩 상태

  const handleAdd = () => {
    setIsAdd(true);
  };
  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFolderName(e.target.value);
  };

  const submitAddFolder = (newFolderName: string) => {
    if (isSubmittingRef.current) return;

    isSubmittingRef.current = true;

    if (!newFolderName.trim()) {
      toast.error('폴더 이름을 입력해주세요.');
      isSubmittingRef.current = false;
      return;
    }

    if (newFolderName.length > MAX_FOLDER_NAME_LENGTH) return;

    serverCreateFolder(newFolderName);
    addFolder(newFolderName);
    closeModal();

    setTimeout(() => {
      isSubmittingRef.current = false;
    }, 500);
  };

  const handleAddClick = (newFolderName: string) => {
    submitAddFolder(newFolderName);
  };
  const handleAddKeyDown = (newFolderName: string, e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.nativeEvent.isComposing) return;
    if (e?.key !== 'Enter') return;

    e.preventDefault();
    submitAddFolder(newFolderName);
  };
  return {
    isAdd,
    setIsAdd,
    newFolderName,
    handleAdd,
    handleAddChange,
    handleAddClick,
    handleAddKeyDown,
  };
};
