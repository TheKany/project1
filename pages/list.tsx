import React, { useEffect, useRef, useState } from 'react';
import styles from '@/styles/join/main.module.scss';
import classNames from 'classnames/bind';
import { utils } from '@/util/reg';

const cn = classNames.bind(styles);

// 타입
interface PasswordTypes {
  pw: boolean;
  pwpw: boolean;
}

interface UserInfoTypes {
  id: string;
  pw: string;
  phone: string;
  'check-bbbb': boolean;
  'check-cccc': boolean;
  'check-dddd': boolean;
  'check-eeee': boolean;
}

const list = () => {
  // 회원가입 정보
  const [userInfo, setUserInfo] = useState<UserInfoTypes>({
    id: '',
    pw: '',
    phone: '',
    'check-bbbb': false,
    'check-cccc': false,
    'check-dddd': false,
    'check-eeee': false,
  });

  // 입력란 -------------------------------
  const [inputs, setInputs] = useState({
    id: '',
    pw: '',
    pwpw: '',
  });

  // 유효성검사 에러표시
  const [error, setError] = useState({
    id: false,
    pw: false,
    pwpw: false,
    pwpwMatch: false,
  });

  // input 유효성 검사 및 업데이트
  const isInputValid = (fieldName: string, value: string): boolean => {
    switch (fieldName) {
      case 'id':
        return utils.regEx.email(value);
      case 'pw':
      case 'pwpw':
        return utils.regEx.password(value);
      default:
        return true;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const value = e.target.value;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [fieldName]: value,
    }));

    setUserInfo((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    setError((prevError) => ({
      ...prevError,
      [fieldName]: !isInputValid(fieldName, value),
    }));
  };

  // 비밀번호 비교 검사
  useEffect(() => {
    if (inputs.pw !== inputs.pwpw) {
      setError((prevError) => ({
        ...prevError,
        pwpwMatch: true,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        pwpwMatch: false,
      }));
    }
  }, [inputs.pw, inputs.pwpw]);

  // 패스워드 show & hide
  const [showPassword, setShowPassword] = useState<PasswordTypes>({
    pw: false,
    pwpw: false,
  });
  const toggleShowPassword = (inputName: string) => {
    setShowPassword((prevShowPassword: any) => ({
      ...prevShowPassword,
      [inputName]: !prevShowPassword[inputName],
    }));
  };

  // 본인인증
  const authAction = async () => {
    const res = await fetch('/api/hello');
    const resData = await res.json();
    const { phone } = resData;
    setUserInfo((prev) => ({
      ...prev,
      phone: phone,
    }));
  };

  // 체크여부
  const [agreeCheck, setAgreeCheck] = useState({
    'check-aaaa': false,
    'check-bbbb': false,
    'check-cccc': false,
    'check-dddd': false,
    'check-eeee': false,
  });
  const handleCheckboxChange = (e) => {
    const checkboxId = e.target.id;

    // 전체 동의 / 해제
    if (checkboxId === 'check-aaaa') {
      if (agreeCheck['check-aaaa'] !== true) {
        setAgreeCheck((prevStates) => ({
          ...prevStates,
          'check-bbbb': true,
          'check-cccc': true,
          'check-dddd': true,
          'check-eeee': true,
        }));

        setUserInfo((prevStates) => ({
          ...prevStates,
          'check-bbbb': true,
          'check-cccc': true,
          'check-dddd': true,
          'check-eeee': true,
        }));
      } else {
        setAgreeCheck((prevStates) => ({
          ...prevStates,
          'check-bbbb': false,
          'check-cccc': false,
          'check-dddd': false,
          'check-eeee': false,
        }));

        setUserInfo((prevStates) => ({
          ...prevStates,
          'check-bbbb': false,
          'check-cccc': false,
          'check-dddd': false,
          'check-eeee': false,
        }));
      }
    }

    if (checkboxId !== 'check-aaaa') {
      setUserInfo((prevStates) => ({
        ...prevStates,
        [checkboxId]: !prevStates[checkboxId],
      }));
    }

    setAgreeCheck((prevStates) => ({
      ...prevStates,
      [checkboxId]: !prevStates[checkboxId],
    }));
  };

  // 가입 완료
  const successJoin = () => {
    if (
      error.id === false &&
      error.pw === false &&
      error.pwpwMatch === false &&
      userInfo['check-bbbb'] === true &&
      userInfo['check-cccc'] === true
    ) {
      alert('가입완료');
    }
  };

  const canJoin = !(
    error.id === false &&
    error.pw === false &&
    error.pwpwMatch === false &&
    !!userInfo.phone === true &&
    userInfo['check-bbbb'] === true &&
    userInfo['check-cccc'] === true
  );

  return (
    <div className="index-container">
      <main className={cn(' container ')}>
        <header>회원가입</header>
        <section className={cn(' mainContainer ')}>
          {/*  */}
          {/* 입력란 */}
          <div className={cn(' inputContainer ')}>
            {/* 아이디 input */}
            <div className={cn('idBox')}>
              <input
                type="text"
                onChange={(e) => handleInputChange(e, 'id')}
                className={cn('input-id')}
                placeholder="test1234@hanmail.net"
              />
              {error.id ? <p className={cn('error', 'error-id')}>아이디가 안맞아요</p> : null}
            </div>
            {/* 비밀번호 input */}
            <div className={cn('pwBox')}>
              <input
                type={showPassword.pw ? 'text' : 'password'}
                onChange={(e) => {
                  handleInputChange(e, 'pw');
                }}
                className={cn('input-pw')}
                placeholder="8~16자리 숫자, 영문, 특수문자 조합"
              />
              <button
                className={cn('pwButton')}
                onClick={() => {
                  toggleShowPassword('pw');
                }}
              >
                {showPassword.pw ? 'show' : 'hide'}
              </button>
              {error.pw ? <p className={cn('error', 'error-pw')}>비밀번호가 안맞아요</p> : null}
            </div>
            {/* 비밀번호확인 input */}
            <div className={cn('pwpwBox')}>
              <input
                type={showPassword.pwpw ? 'text' : 'password'}
                onChange={(e) => {
                  handleInputChange(e, 'pwpw');
                }}
                className={cn('input-pwpw')}
                placeholder="비밀번호를 한 번 더 입력해주세요"
              />
              <button className={cn('pwpwButton')} onClick={() => toggleShowPassword('pwpw')}>
                {showPassword.pwpw ? 'show' : 'hide'}
              </button>
              {error.pwpw ? <p className={cn('error', 'error-pwpw')}>비밀번호가 안맞아요</p> : null}
              {error.pwpwMatch ? (
                <p className={cn('error', 'error-pwpw')}>비밀번호가 안맞아요</p>
              ) : null}
            </div>
          </div>
          {/*  */}
          {/* 본인인증 */}
          <div className={cn(' authContainer ')}>
            <button onClick={authAction}>본인인증</button>
            {userInfo.phone === '' ? (
              <p className={cn(' phone ')}>휴대폰 인증을 해주세요</p>
            ) : (
              <p className={cn(' phone ')}>{userInfo.phone}</p>
            )}
          </div>
          {/*  */}
          {/* 약관동의 */}
          <div className={cn(' agreeContainer ')}>
            <div className={cn('agreeBox', 'aaaa')}>
              <input
                type="checkbox"
                id="check-aaaa"
                className={cn('agreeCheck')}
                checked={agreeCheck['check-aaaa']}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="check-aaaa" className={cn('agreeCheck-label')}></label>
              <label htmlFor="check-aaaa" className={cn('agreeCheck-description')}>
                전체 약관에 동의합니다.
              </label>
            </div>
            <div className={cn('agreeBox', 'bbbb')}>
              <input
                type="checkbox"
                id="check-bbbb"
                className={cn('agreeCheck')}
                checked={agreeCheck['check-bbbb']}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="check-bbbb" className={cn('agreeCheck-label')}></label>
              <label htmlFor="check-bbbb" className={cn('agreeCheck-description')}>
                이용약관(필수)
              </label>
            </div>
            <div className={cn('agreeBox', 'cccc')}>
              <input
                type="checkbox"
                id="check-cccc"
                className={cn('agreeCheck')}
                checked={agreeCheck['check-cccc']}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="check-cccc" className={cn('agreeCheck-label')}></label>
              <label htmlFor="check-cccc" className={cn('agreeCheck-description')}>
                개인정보 수집 및 이용안내(필수)
              </label>
            </div>
            <div className={cn('agreeBox', 'dddd')}>
              <input
                type="checkbox"
                id="check-dddd"
                className={cn('agreeCheck')}
                checked={agreeCheck['check-dddd']}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="check-dddd" className={cn('agreeCheck-label')}></label>
              <label htmlFor="check-dddd" className={cn('agreeCheck-description')}>
                뉴스레터 신청/광고 수신동의(선택)
              </label>
            </div>
            <div className={cn('agreeBox', 'eeee')}>
              <input
                type="checkbox"
                id="check-eeee"
                className={cn('agreeCheck')}
                checked={agreeCheck['check-eeee']}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="check-eeee" className={cn('agreeCheck-label')}></label>
              <label htmlFor="check-eeee" className={cn('agreeCheck-description')}>
                이벤트 및 할인 광고/알림 수신동의(선택)
              </label>
            </div>
          </div>
          {/*  */}
          {/* 완료 */}
          <button onClick={successJoin} disabled={canJoin}>
            가입 완료
          </button>
        </section>
      </main>
    </div>
  );
};

export default list;
