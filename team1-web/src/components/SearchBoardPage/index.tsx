import styles from './index.module.scss';
import BoardListBoard from '../Layout/BoardLayout/BoardListBoard';
import { useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState, useAppSelector } from '../../store';
import { useApiData, useApiGetBoardSearchResult } from '../../lib/api';
import { Board } from '../../lib/types';
import { Link } from 'react-router-dom';

export default function SearchBoardPage() {
  const token = useAppSelector((state: RootState) => state.session.token);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchedKeyword, setSearchedKeyword] = useState<string>('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchResultData = useApiData(useApiGetBoardSearchResult(token, searchedKeyword));

  return (
    <>
      <BoardListBoard />
      <article className={styles['search-board-page']}>
        <article className={styles['container']}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type='text'
              placeholder='게시판 검색'
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (!searchKeyword) {
                    toast.warning('검색어를 입력하세요!');
                  } else {
                    navigate({ search: `?${createSearchParams({ keyword: searchKeyword })}` });
                    setSearchedKeyword(searchKeyword);
                  }
                }
              }}
            />
          </form>
          <div className={styles['search-result']}>
            {!searchParams.toString() ? (
              <p className={styles['not-searched']}>
                게시판 목록에 없는 다른 게시판을 검색해보세요!
              </p>
            ) : (
              <>
                <h1>{`'${searchedKeyword}' 검색 결과`}</h1>
                {searchResultData?.toString() ? (
                  searchResultData?.map((board: Board, index: number) => (
                    <Link key={index} to={`/${board.boardId}`} className={styles['board-item']}>
                      <h2>{board.title}</h2>
                      <p>{board.description}</p>
                    </Link>
                  ))
                ) : (
                  <p className={styles['not-searched']}>검색된 게시판이 없습니다.</p>
                )}
              </>
            )}
          </div>
        </article>
      </article>
    </>
  );
}
