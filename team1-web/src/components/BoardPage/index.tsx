import { RefObject, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Board, ImageWithDesc } from '../../lib/types';
import PostItems from './PostItems';
import styles from './index.module.scss';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { useApiData, useApiGetBoard, useApiGetBoardPosts } from '../../lib/api';
import { createPost } from '../../store/boardSlice';
import Thumbnail from './Thumbnail';

export default function BoardPage() {
  const boardName = '자유게시판';
  const dispatch = useAppDispatch();

  const { boardId, index } = useParams();

  const hiddenFileInput = useRef<any>(null);

  const newPostDescription = `
와플리타임은 누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 커뮤니티 이용규칙을 제정하여 운영하고 있습니다.
위반 시 게시물이 삭제되고 서비스 이용이 일정 기간 제한될 수 있습니다. 

아래는 이 게시판에 해당하는 핵심 내용에 대한 요약 사항이며, 게시물 작성 전 커뮤니티 이용규칙 전문을 반드시 확인하시기 바랍니다. 

※ 정치·사회 관련 행위 금지 
- 국가기관, 정치 관련 단체, 언론, 시민단체에 대한 언급 혹은 이와 관련한 행위 
- 정책·외교 또는 정치·정파에 대한 의견, 주장 및 이념, 가치관을 드러내는 행위 
- 성별, 종교, 인종, 출신, 지역, 직업, 이념 등 사회적 이슈에 대한 언급 혹은 이와 관련한 행위 
- 위와 같은 내용으로 유추될 수 있는 비유, 은어 사용 행위 
* 해당 게시물은 시사·이슈 게시판에만 작성 가능합니다. 

※ 홍보 및 판매 관련 행위 금지 
- 영리 여부와 관계 없이 사업체·기관·단체·개인에게 직간접적으로 영향을 줄 수 있는 게시물 작성 행위 
- 위와 관련된 것으로 의심되거나 예상될 수 있는 바이럴 홍보 및 명칭·단어 언급 행위 
* 해당 게시물은 홍보게시판에만 작성 가능합니다. 

※ 불법촬영물 유통 금지
불법촬영물등을 게재할 경우 전기통신사업법에 따라 삭제 조치 및 서비스 이용이 영구적으로 제한될 수 있으며 관련 법률에 따라 처벌받을 수 있습니다. 

※ 그 밖의 규칙 위반 
- 타인의 권리를 침해하거나 불쾌감을 주는 행위 
- 범죄, 불법 행위 등 법령을 위반하는 행위 
- 욕설, 비하, 차별, 혐오, 자살, 폭력 관련 내용을 포함한 게시물 작성 행위 
- 음란물, 성적 수치심을 유발하는 행위 
- 스포일러, 공포, 속임, 놀라게 하는 행위`;

  const [loading, setLoading] = useState(false);
  const [newPostBool, setNewPostBool] = useState(false);
  const [anonymBool, setAnonymBool] = useState(false);
  const [questionBool, setQuestionBool] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newFilesWithDesc, setNewFilesWithDesc] = useState<ImageWithDesc[]>([]);
  const [fileBool, setFileBool] = useState(false);

  const token = useAppSelector((state: RootState) => state.session.token);
  const currentPosts =
    useApiData(
      useApiGetBoardPosts(token, boardId, Number(index === undefined ? 1 : index) - 1, 20, loading)
    ) || null;
  const currentBoard = useApiData(useApiGetBoard(token, Number(boardId), loading)) || null;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (hiddenFileInput.current) hiddenFileInput.current.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileUploaded = event.target.files;
      console.log(fileUploaded);
      setNewFilesWithDesc(
        newFilesWithDesc.concat(
          Array.from(fileUploaded).map((file) => {
            return { file: file, description: '' };
          })
        )
      );
      setFileBool(true);
    }
    // handleFile(fileUploaded);
  };

  const handleCreatePost = async () => {
    setLoading(true);
    const data = {
      token: token,
      boardId: Number(boardId),
      title: newPostTitle,
      contents: newPostContent,
      isQuestion: questionBool,
      isWriterAnonymous: anonymBool,
      images: newFilesWithDesc.map((image, index) => {
        return {
          imageId: index,
          fileName: image.file.name,
          description: image.description === '' ? null : image.description,
          file: image.file,
        };
      }),
    };
    try {
      await dispatch(createPost(data));
      setNewPostContent('');
      setNewPostTitle('');
      setNewPostBool(false);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const getBoardName = () => {
    switch (boardId) {
      case 'mypost':
        return '내가 쓴 글';
      case 'mycommentpost':
        return '댓글 단 글';
      case 'myscrap':
        return '내 스크랩';
      default:
        return currentBoard?.title ? currentBoard?.title : '(알 수 없음)';
    }
  };

  return (
    <article className={styles['board']}>
      <div className={styles['board-title']}>
        <h1>
          <Link to={boardId === undefined ? '/1' : `/${boardId}`}>{getBoardName()}</Link>
        </h1>
      </div>
      {loading ? (
        <div className={styles['loading']}>불러오는 중입니다...</div>
      ) : (
        <>
          {newPostBool && (
            <div className={styles['write']}>
              <p>
                <input
                  name='title'
                  autoComplete='off'
                  placeholder='글 제목'
                  className={styles['title']}
                  onChange={(e) => {
                    setNewPostTitle(e.target.value);
                  }}
                />
              </p>
              <p>
                <textarea
                  name='text'
                  placeholder={newPostDescription}
                  className={styles['smallplaceholder']}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
              </p>
              <ol className={fileBool ? styles['thumbnails'] : styles['thumbnails-off']}>
                <>
                  {newFilesWithDesc.map((image, index) => {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(image.file);
                    return (
                      <Thumbnail
                        file={image.file}
                        fileReader={fileReader}
                        newFilesWithDesc={newFilesWithDesc}
                        setNewFilesWithDesc={setNewFilesWithDesc}
                        desc={image.description}
                        index={index}
                      />
                    );
                  })}
                </>
                <li className={styles['new']} onClick={handleClick} />
              </ol>
              <div className={styles['clearBothOnly']} />
              <p className={questionBool ? styles['question-on'] : styles['question-off']}>
                <div>
                  질문 글을 작성하면 게시판 상단에 일정 기간 동안 노출되어, 더욱 빠르게 답변을 얻을
                  수 있게 됩니다.
                  <br />
                  또한, 다른 학우들이 정성껏 작성한 답변을 유지하기 위해, 댓글이 달린 이후에는{' '}
                  <b>글을 수정 및 삭제할 수 없습니다.</b>
                </div>
              </p>
              <ul className={styles['option']}>
                <li title='해시태그' className={styles['hashtag']}></li>
                <li title='첨부' onClick={handleClick} className={styles['attach']}></li>
                <input
                  className={styles['file']}
                  id='file-upload'
                  type='file'
                  name='file'
                  multiple={true}
                  ref={hiddenFileInput}
                  onChange={handleChange}
                />
                <li title='완료' className={styles['submit']} onClick={handleCreatePost}></li>
                <li
                  title='익명'
                  className={anonymBool ? styles['anonym-on'] : styles['anonym-off']}
                  onClick={() => {
                    setAnonymBool((e) => !e);
                  }}
                ></li>
                <li
                  title='질문'
                  className={questionBool ? styles['question-on'] : styles['question-off']}
                  onClick={() => {
                    setQuestionBool((e) => !e);
                  }}
                ></li>
              </ul>
              <div className={styles['clearBothOnly']}></div>
            </div>
          )}
          <div
            onClick={() => {
              setNewPostBool(true);
            }}
            className={styles['add-new-Post']}
          >
            새 글을 작성해주세요!
          </div>
          {currentPosts !== null && (
            <PostItems
              Posts={currentPosts.contents}
              index={index === undefined ? 1 : Number(index)}
            />
          )}
        </>
      )}
      <div className={styles['pagination']}>
        {index === undefined || index === '1' ? (
          <div className={styles['search']}>
            <select name='search_type'>
              <option value='4'>전체</option>
              <option value='3'>해시태그</option>
              <option value='2'>글 제목</option>
              <option value='1'>글 내용</option>
            </select>
            <input name='keyword' placeholder='검색어를 입력하세요.' className={styles['text']} />
          </div>
        ) : (
          <Link
            to={`/${boardId}/p/${((index === undefined ? 1 : Number(index)) - 1).toString()}`}
            className={styles['prev']}
          >
            이전
          </Link>
        )}
        {!currentPosts?.isLast && (
          <Link
            to={`/${boardId}/p/${((index === undefined ? 1 : Number(index)) + 1).toString()}`}
            className={styles['next']}
          >
            다음
          </Link>
        )}
      </div>
    </article>
  );
}
