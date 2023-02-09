import { AppDispatch } from '@/app/store'
import { selectTheme } from '@/features/User/selectors';
import { setTheme, Theme } from '@/features/User/userSlice';
import { useDispatch, useSelector } from 'react-redux'

export const useTheme = () => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const toggleTheme = (checked: boolean): void => {
    const theme: Theme = checked ? 'dark' : 'light'

    dispatch(setTheme(theme));
  }

  return { theme, toggleTheme };
}