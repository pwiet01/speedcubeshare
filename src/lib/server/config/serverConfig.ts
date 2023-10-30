import { NODE_ENV } from '$env/static/private';

export const serverConfig = {
  isDevEnv: isDevEnv(),
};

function isDevEnv() {
  return NODE_ENV === 'development';
}
