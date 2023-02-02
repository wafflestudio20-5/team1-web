import styles from './ChangePasswordPage.module.scss';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { changeUserInfo, logout } from '../../store/sessionSlice';
import { Navigate, useNavigate } from 'react-router-dom';

export default function ChangePassword() {
  const token = useAppSelector((state: RootState) => state.session.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [newPW, setNewPW] = useState<string>('');
  const [newPWCheck, setNewPWCheck] = useState<string>('');
  const [currentPW, setCurrentPW] = useState<string>('');

  async function handleChangePassword() {
    const isValidNewPW = newPW && newPW?.length >= 8; // TODO: 유효PW 조건 추가
    const isNewPWEqualNewPWCheck = newPW && newPW === newPWCheck;

    if (!isValidNewPW) {
      toast.error('새 비밀번호가 조건에 부합하지 않습니다');
    } else if (!isNewPWEqualNewPWCheck) {
      toast.error('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다');
    } else {
      const newUserInfo = { oldPassword: currentPW, newPassword: newPW };
      const data = { token, newUserInfo };
      const response = window.confirm(
        '비밀번호를 변경하면 모든 디바이스에서 즉시 로그아웃 처리됩니다. 변경하시겠습니까?'
      );
      if (response) {
        try {
          await dispatch(changeUserInfo(data));
          navigate('/');
          await dispatch(logout(token));
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
  return (
    <article className={styles['change-password-page']}>
      <form
        className={styles['card']}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1 className={styles['title']}>비밀번호 변경</h1>
        <section className={styles['password-form']}>
          <label className={styles['new-password']}>새 비밀번호</label>
          <p className={styles['info']}>
            영문, 숫자, 특문이 2종류 이상 조합된 8~20자
          </p>
          <input
            className={styles[`${newPW && newPW?.length < 8 && 'caution'}`]}
            type='password'
            placeholder='새 비밀번호'
            maxLength={20}
            value={newPW}
            onChange={(e) => {
              setNewPW(e.target.value);
            }}
          />
          {newPW && newPW?.length < 8 && (
            <p className={styles['caution']}>8자 이상 입력하세요</p>
          )}
          <input
            className={
              styles[`${newPWCheck && newPW !== newPWCheck && 'caution'}`]
            }
            type='password'
            placeholder='새 비밀번호 확인'
            maxLength={20}
            value={newPWCheck}
            onChange={(e) => {
              setNewPWCheck(e.target.value);
            }}
          />
          {newPWCheck && newPW !== newPWCheck && (
            <p className={styles['caution']}>비밀번호가 일치하지 않습니다</p>
          )}
          <label className={styles['current-password']}>현재 비밀번호</label>
          <input
            className={styles[`${currentPW && 'pass'}`]}
            type='password'
            placeholder='현재 비밀번호'
            maxLength={20}
            value={currentPW}
            onChange={(e) => {
              setCurrentPW(e.target.value);
            }}
          />
        </section>
        <section className={styles['notice']}>
          <p>
            <strong>※ 혹시 타인에게 계정을 양도하려고 하시나요?</strong>
            <br />
            에브리타임 이용약관에서는 타인에게 계정 판매, 양도 및 대여 등을
            엄격하게 금지하고 있습니다.
            <br />
            모니터링 시스템에 의해 계정 양도가 적발될 경우 해당 계정은 영구
            정지, 탈퇴 등의 조치가 가해지며, 계정 양도로 인해 사기, 불법 행위가
            발생할 경우 관련법에 따라
            <span> 법적 책임을 지게 될 수 있습니다.</span>
          </p>
          <p>
            <strong>※ 타인에 의한 계정 사용이 의심되시나요?</strong>
            <br />
            개인정보 보호를 위해 비밀번호를 변경하여 주시기 바랍니다. 비밀번호를
            변경하면
            <span>
              모든 디바이스(앱, 브라우저 등)에서 즉시 로그아웃 처리됩니다.
            </span>
          </p>
        </section>
        <input
          type='submit'
          value='비밀번호 변경'
          onClick={handleChangePassword}
        />
      </form>
    </article>
  );
}
