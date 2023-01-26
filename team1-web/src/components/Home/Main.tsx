import styles from "./Main.module.scss";
import { BoardList, Board } from "../../lib/types";
import { Link } from "react-router-dom";
import { useApiData, useApiGetBoardPosts } from "../../lib/api";
import { RootState, useAppSelector } from "../../store";
import { formattedTime } from "../../lib/format";

function BoardItem({ board }: { board: Board }) {
  const token = useAppSelector((state: RootState) => state.session.token);
  const boardPostsData = useApiData(
    useApiGetBoardPosts(token, board.boardId, 0, 4)
  );
  const doesPostHasTitle = boardPostsData?.content[0]?.title; // TODO: api response 수정되면 이것도 수정
  const nDisplayPost = doesPostHasTitle ? 4 : 2;

  return (
    <section className={styles["board"]}>
      <h1 className={styles["board-title"]}>
        <Link to={`${board.boardId}`}>{board.name}</Link>
      </h1>
      <ul className={styles["posts"]}>
        {boardPostsData?.content.map(
          (post, index) =>
            index < nDisplayPost && (
              <li
                key={index}
                className={`${styles["post"]} ${
                  styles[doesPostHasTitle ? "has-title" : "no-title"]
                }`}
              >
                <Link to={`${board.boardId}/v/${post.postId}`}>
                  {doesPostHasTitle ? (
                    <>
                      <time>{formattedTime(post.createdAt)}</time>
                      <p>{post.title}</p>
                    </>
                  ) : (
                    <>
                      <p>{post.contents}</p>
                      <time>{formattedTime(post.createdAt)}</time>
                      <ul className={styles["status"]}>
                        <li className={styles["likes"]}>{post.nlikes}</li>
                        <li className={styles["replies"]}>{post.nreplies}</li>
                      </ul>
                    </>
                  )}
                </Link>
              </li>
            )
        )}
      </ul>
    </section>
  );
}

export default function Main() {
  const boardLists: BoardList[] = [
    {
      id: 0,
      category: "basic",
      size: 16,
      defaultDisplayColumnSize: 2,
      boards: [
        { boardId: 1, name: "자유게시판" },
        { boardId: 4, name: "비밀게시판" },
      ],
      // boards: [
      //   { boardId: 0, name: '자유게시판' },
      //   { boardId: 1, name: '비밀게시판' },
      //   { boardId: 2, name: '졸업생게시판' },
      //   { boardId: 3, name: '새내기게시판' },
      //   { boardId: 4, name: '시사·이슈' },
      //   { boardId: 5, name: '장터게시판' },
      //   { boardId: 6, name: '정보게시판' },
      //   { boardId: 7, name: '취업·진로' },
      //   { boardId: 8, name: '로스쿨게시판' },
      //   { boardId: 9, name: 'cpa 게시판👨‍💼👩‍💼' },
      //   { boardId: 10, name: '행시/외교원 게시판' },
      //   { boardId: 11, name: '🎓대학원 게시판😨' },
      //   { boardId: 12, name: '피트 게시판' },
      //   { boardId: 13, name: '변리사 게시판' },
      //   { boardId: 14, name: '홍보게시판' },
      //   { boardId: 15, name: '동아리·학회' },
      // ],
    },
  ];
  return (
    <article className={styles["main"]}>
      <article className={styles["banner"]}>배너</article>
      <article className={styles["boards"]}>
        {/* TODO: 추후 업데이트 */}
        {boardLists[0].boards.map((board) => (
          <BoardItem key={board.boardId} board={board} />
        ))}
      </article>
      <article className={styles["bookstore"]}></article>
    </article>
  );
}
