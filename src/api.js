export const API_END_POINT = 'https://kdt-frontend.cat-api.programmers.co.kr';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, options);
    if (res.ok) {
      return await res.json();
    }
    throw new Error('api 통신 중 에러');
  } catch (e) {
    console.log(e);
  }
};
