import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiSendVerifyEmail } from '../../lib/api';
import { axiosErrorHandler } from '../../lib/error';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { verifyEmail } from '../../store/sessionSlice';
import styles from './index.module.scss';

export default function EmailVerifyPage() {
  const token = useAppSelector((state: RootState) => state.session.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [bCheckbox1, setBCheckbox1] = useState<boolean>(false);
  const [bCheckbox2, setBCheckbox2] = useState<boolean>(false);
  const [bIsEmailSended, setBIsEmailSended] = useState<boolean>(false);
  const [verifyCode, setVerifyCode] = useState<string>('');

  async function handleSendEmail() {
    if (!email) {
      toast.error('이메일을 입력하세요');
      return;
    }
    if (!(bCheckbox1 && bCheckbox2)) {
      toast.error('약관에 동의해주세요');
      return;
    }
    try {
      await apiSendVerifyEmail(token, email);
      toast.success('인증 메일을 전송했습니다');
      setBIsEmailSended(true);
    } catch (e) {
      axiosErrorHandler(e, '이메일을 다시 입력하세요');
    }
  }
  async function handleSubmitVerifyCode() {
    if (!verifyCode) {
      toast.error('인증 코드를 입력하세요');
      return;
    }
    try {
      await dispatch(verifyEmail({ token, verifyCode }));
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <article className={styles['email-verify-page']}>
      <article className={styles['card']}>
        <h1 className={styles['title']}>학교 인증</h1>

        <section className={styles['notice']}>
          <h2 className={styles['title']}>학교 웹메일 인증 안내</h2>
          <p className={styles['text']}>
            학교에서 학내 구성원에게 발급하는 웹메일을 이용한 인증 방법입니다. 이메일 수신 후 본문에
            포함된 코드를 입력하면 즉시 인증이 완료됩니다.
          </p>
        </section>

        <section className={styles['agreements']}>
          <h2 className={styles['title']}>약관 동의</h2>
          <section className={styles['agreement']}>
            <input
              type='checkbox'
              onChange={() => {
                setBCheckbox1((prev) => !prev);
              }}
              disabled={bIsEmailSended ? true : false}
            />
            <label>재학생 인증 이용 동의 (필수)</label>
            <ul className={styles['contents']}>
              <li className={styles['content']}>
                개인정보 도용, 사문서 위조, 해킹 등의 행위가 적발될 경우, 관련 법에 따라 법적 책임이
                따를 수 있습니다.
              </li>
              <li className={styles['content']}>
                재학생 인증은 학부 재학생을 위한 인증 수단이며, 대학원생, 학점교류생, 교직원,
                타캠퍼스 구성원은 인증되지 않습니다.
              </li>
              <li className={styles['content']}>
                회원가입 및 본인 인증 시 수집된 본인 정보와 일치하지 않는 경우 인증되지 않습니다.
              </li>
            </ul>
          </section>
          <section className={styles['agreement']}>
            <input
              type='checkbox'
              onChange={() => {
                setBCheckbox2((prev) => !prev);
              }}
              disabled={bIsEmailSended ? true : false}
            />
            <label>개인정보처리방침 동의 (필수)</label>
            <ul className={styles['contents']}>
              <li className={styles['content']}>
                수집된 개인정보는 개인정보처리방침에 따라 안전하게 처리됩니다.
              </li>
              <li className={styles['content']}>
                재학생 확인 절차를 위해 이메일 주소를 수집합니다.
              </li>
            </ul>
          </section>
        </section>

        <section className={styles['email']}>
          <h2 className={styles['title']}>이메일 주소 입력</h2>
          <div>
            <label className={styles['text']}>이메일</label>
            <p className={styles['text']}>@snu.ac.kr</p>
          </div>
          <input
            className={
              email.includes('@')
                ? email.endsWith('@snu.ac.kr')
                  ? styles['pass']
                  : styles['caution']
                : ''
            }
            type='text'
            placeholder='이메일'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            disabled={bIsEmailSended ? true : false}
          />
          {email && email.includes('@') && !email.endsWith('@snu.ac.kr') && (
            <p className={styles['caution']}>학교에서 발급한 이메일을 입력해주세요.</p>
          )}

          <div>
            <label className={styles['text']}>인증코드</label>
          </div>
          <input
            type='text'
            placeholder='인증코드'
            value={verifyCode}
            onChange={(e) => {
              setVerifyCode(e.target.value);
            }}
            disabled={bIsEmailSended ? false : true}
          />
        </section>
        {bIsEmailSended ? (
          <input
            className={styles['submit']}
            type='submit'
            value='인증 코드 확인'
            onClick={handleSubmitVerifyCode}
          />
        ) : (
          <input
            className={styles['submit']}
            type='submit'
            value='인증 메일 발송하기'
            onClick={handleSendEmail}
          />
        )}
      </article>
    </article>
  );
}
