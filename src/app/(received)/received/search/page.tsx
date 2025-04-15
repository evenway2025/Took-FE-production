'use client';

import { useEffect, useState } from 'react';

import { useReceivedCardsQuery } from '@/features/received/model/queries/useReceivedCardsQuery';
import { useReceivedCardsStore } from '@/features/received/model/store/useReceivedCardsStore';
import SearchCardView from '@/features/received/ui/search/searchCardView';
import useHistoryBack from '@/shared/hooks/useHistoryBack';
import Appbar from '@/shared/ui/appbar';
import Toast from '@/shared/ui/Toast';

type SearchKeywordType = {
  createdAt: string;
  keyword: string;
};

function Page() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearched, setIsSearched] = useState<boolean>(false); // 검색을 완료했는가? true - 최근 검색어 모달 off

  const { cards: serverReceivedCards, isLoading: isCardsLoading } = useReceivedCardsQuery(null);
  const handleBack = useHistoryBack();

  const { setReceivedCards } = useReceivedCardsStore();

  useEffect(() => {
    if (!isCardsLoading) setReceivedCards(serverReceivedCards);
  }, [isCardsLoading, serverReceivedCards, setReceivedCards]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value === '') setIsSearched(false);
  };

  function saveSearchKeyword(keyword: string) {
    if (typeof window === 'undefined') return;
    if (!keyword.trim()) return;

    const newKeyword: SearchKeywordType = {
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      keyword: searchValue.trim(),
    };

    const storageKey = 'latest'; // 추후 상수파일로 옮겨놓기

    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]') as SearchKeywordType[];
    const filtered = existing.filter((entry) => entry.keyword !== keyword);
    const updated = [newKeyword, ...filtered].slice(0, 10);

    localStorage.setItem(storageKey, JSON.stringify(updated));
    setIsSearched(true);
  }

  const handleSetSearchKeywordKeyDown = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.nativeEvent.isComposing) return;
    if (e?.key !== 'Enter') return;

    e.preventDefault();
    saveSearchKeyword(searchValue);
    e.currentTarget.blur();
  };

  const handleInputClick = () => {
    setIsSearched(false);
  };
  return (
    <div className="flex h-dvh w-full justify-center">
      <div className="flex w-full max-w-[600px] flex-col bg-gray-black">
        <Appbar
          page="search"
          searchValue={searchValue}
          onLeftClick={handleBack}
          onRightClick={() => saveSearchKeyword(searchValue)}
          onSearchChange={handleSearchChange}
          onKeyDown={(e) => handleSetSearchKeywordKeyDown(e)}
          onInputClick={handleInputClick}
        />
        <div className="overflow-y-auto px-5 pb-24 pt-4 scrollbar-hide">
          <SearchCardView
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            isSearched={isSearched}
            setIsSearched={setIsSearched}
          />
        </div>
        <Toast />
      </div>
    </div>
  );
}

export default Page;
