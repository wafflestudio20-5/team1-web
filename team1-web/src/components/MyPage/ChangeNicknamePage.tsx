import styles from "./ChangeNicknamePage.module.scss";
import { useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { toast } from "react-toastify";
import { changeUserInfo } from "../../store/sessionSlice";
import { useNavigate } from "react-router-dom";
import { useApiCheckNickname } from "../../lib/api";

export default function ChangeNicknamePage() {
  const token = useAppSelector((state: RootState) => state.session.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [newNickname, setNewNickname] = useState<string>("");
  const isAvailableNickname = useApiCheckNickname(newNickname);

  async function handleChangeNickname() {
    const isValidNewNickname = newNickname && newNickname?.length >= 2;

    if (!isValidNewNickname) {
      toast.error("2~10자까지 가능합니다.");
    } else if (!isAvailableNickname) {
      toast.error("이미 사용중인 닉네임입니다.");
    } else {
      const newUserInfo = { nickname: newNickname };
      const data = { token, newUserInfo };
      const response = window.confirm(
        "닉네임을 설정하면 30일간 변경할 수 없습니다. 변경하시겠습니까?"
      );
      if (response) {
        try {
          await dispatch(changeUserInfo(data));
          navigate("/");
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
  return (
    <article className={styles["change-nickname-page"]}>
      <article className={styles["card"]}>
        <h1 className={styles["title"]}>닉네임 설정</h1>
        <label>닉네임</label>
        <input
          className={`${styles["new-nickname"]} ${
            newNickname && newNickname?.length < 2 && styles["caution"]
          }`}
          type="text"
          placeholder="닉네임"
          maxLength={10}
          value={newNickname}
          onChange={(e) => {
            setNewNickname(e.target.value);
          }}
        />
        {newNickname && newNickname?.length < 2 && (
          <p className={styles["caution"]}>2자 이상 입력하세요</p>
        )}
        {newNickname && newNickname?.length >= 2 && !isAvailableNickname && (
          <p className={styles["caution"]}>이미 사용중인 닉네임입니다.</p>
        )}
        <p className={styles["notice"]}>
          ※ 닉네임을 설정하면
          <span> 30일간 변경할 수 없습니다.</span>
        </p>
        <input
          className={styles["submit"]}
          type="submit"
          value="닉네임 설정"
          onClick={handleChangeNickname}
        />
      </article>
    </article>
  );
}
