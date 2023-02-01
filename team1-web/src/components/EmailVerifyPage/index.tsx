import styles from './index.module.scss';

export default function EmailVerifyPage() {
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

        <section className={styles['email']}>
          <h2 className={styles['title']}>이메일 주소 입력</h2>
          <label>이메일</label>
          <p className={styles['text']}>@snu.ac.kr</p>
          <input type='text' placeholder='이메일' maxLength={10} />
        </section>

        <section className={styles['agreements']}>
          <section className={styles['agreement']}>
            <input type='checkbox' />
            <label>재학생 인증 이용 동의(필수)</label>
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
            <input type='checkbox' />
            <label>개인정보처리방침 동의(필수)</label>
            <ul className={styles['contents']}>
              <li className={styles['content']}>
                수집된 개인정보는 개인정보처리방침에 따라 안전하게 처리됩니다.
              </li>
              <li className={styles['content']}>
                재학생 확인 절차를 위해 이메일 주소를 수집합니다.
              </li>
            </ul>
          </section>
          <div className={styles['button-container']}>
            <input className={styles['submit']} type='submit' value='인증 메일 발송하기' />
          </div>
        </section>
      </article>
    </article>
  );
}
