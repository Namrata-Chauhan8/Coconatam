import { ACCESS_TOKEN_KEY } from '@/@core/utils/constants';
import Cookies from 'js-cookie'

export const GET_LOCAL_ACCESS_TOKEN = () => {
  return Cookies.get(ACCESS_TOKEN_KEY) || ''
}