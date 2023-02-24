import { iconIds } from '@/utils/config/iconIds';
import { FC, FormEventHandler } from 'react';
import Icon from '../Icon';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onInput: FormEventHandler<HTMLInputElement>;
}

export const SearchBar: FC<SearchBarProps> = ({ onInput }: SearchBarProps): JSX.Element => {
  return (
    <div className={styles.searchBar}>
      <span className={styles.searchBar__icon}>
        <Icon id={iconIds.search} fill={'var(--controls-svg)'} width={'1.5rem'} height={'1.5rem'} />
      </span>
      <input className={styles.searchBar__input} type="text" onInput={onInput} placeholder="Search track" />
    </div>
  );
};
