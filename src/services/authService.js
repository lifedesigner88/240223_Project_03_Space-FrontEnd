// 사용자 인증 및 권한 부여와 관련된 작업을 처리하는 파일로, 사용자 로그인, 로그아웃, 회원가입 등의 작업을 수행하고 사용자의 인증 상태를 관리
import axios from 'axios';
import { triggerOngoing, triggerNegative } from 'src/state/modules/notificationModule';

export function RegisterApi(formData, $q, router) {
  axios.post('http://localhost:8080/api/member/create', formData)
    .then(response => {
      triggerOngoing('회원가입 했습니다. 로그인해주세요.', $q);
      router.push('/');
    })
    .catch(error => {
      triggerNegative(error.response.data.message, $q);
    });
}

export function githubApi(){
  location.href='http://localhost:8080/oauth2/authorization/github';
}
export function googleApi(){
  location.href='http://localhost:8080/oauth2/authorization/google';
}
