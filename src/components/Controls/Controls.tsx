import React, { useEffect, useRef } from 'react';
import Icon from '../Icon';
import styles from './Controls.module.scss';
import { iconIds } from '@utils/config/iconIds';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { setIsPlaying, setNewCurrentTrack } from '@features/Tracks/trackSlice';
import { tracks } from "@services/mockDataService";

const Controls = () => {
  const blockName = 'controls'
  const dispatch: AppDispatch = useDispatch();
  const currentTrack = useSelector((state: RootState) => state.tracks.currentTrack);
  const isPlaying = useSelector((state: RootState) => state.tracks.isPlaying);
  const { current: audio } = useRef(new Audio());

  useEffect(() => {
    const play = async () => {
      audio.src = `tracks/${currentTrack.src}`;

      if (!isPlaying) {
        audio.pause();

        return;
      }

      await audio.play();
    };

    play().then();
  },
    [isPlaying, currentTrack])

  const previousTrack = () => {
    const currentSongIndex = tracks.findIndex((track) => track.id === currentTrack.id);
    const previousTrack = tracks[currentSongIndex - 1]

    dispatch(setNewCurrentTrack(previousTrack));
    audio.src = `tracks/${previousTrack.src}`
  }

  const nextTrack = () => {
    const currentSongIndex = tracks.findIndex((track) => track.id === currentTrack.id);
    const nextTrack = tracks[currentSongIndex + 1]

    dispatch(setNewCurrentTrack(nextTrack));
    audio.src = `tracks/${nextTrack.src}`
  }

  const isDisabled = (disableIndex: number) => {
    const currentSongIndex = tracks.findIndex((track) => track.id === currentTrack.id);

    return currentSongIndex === disableIndex;
  }

  return (
    <div className={styles.controls}>
      <div className={styles.controls__progressBar}></div>
      <div className={`${styles.controls__inner} _container`}>
        <div className={styles.controls__mainControls}>
          <button className={styles.controls__prevButton}
                  disabled={isDisabled(0)}
                  onClick={previousTrack}
          >
            <Icon id={iconIds.prev} width='1.5em' height='1.5em' blockName={blockName} fill='#E5E5E5'/>
          </button>
          <button
            className={styles.controls__playButton}
            onClick={() => dispatch(setIsPlaying(!isPlaying))}
          >
            <Icon id={isPlaying ? iconIds.pause : iconIds.play} width='2em' height='2em' blockName={blockName} fill='#E5E5E5' />
          </button>
          <button className={styles.controls__nextButton}
                  disabled={isDisabled(tracks.length - 1)}
                  onClick={nextTrack}
          >
            <Icon id={iconIds.next} width='1.5em' height='1.5em' blockName={blockName} fill='#E5E5E5'/>
          </button>
          <button className={styles.controls__repeatButton}>
            <Icon id={iconIds.repeat} fill='#E5E5E5' width='1.75em' height='1.75em' blockName={blockName}/>
          </button>
          <button className={styles.controls__playlistsButton}>
            <Icon id={iconIds.playlists} fill='#E5E5E5' width='1.75em' height='1.75em' blockName={blockName}/>
          </button>
            <div className={styles.controls__trackInfo}>
            <figure className={styles.controls__trackCoverWrapper}>
              <img src={ `images/covers/${currentTrack.coverUrl }` } alt={ currentTrack.src }/>
            </figure>
            <div className={styles.controls__trackDetails}>
              <p className={`${styles.controls__trackTitle} _text`}>{ currentTrack.title }</p>
              <p className={`${styles.controls__artist} _text`}>{ currentTrack.artist }</p>
            </div>
          </div>
        </div>
        <div className={styles.controls__secondaryControls}>
          <button className={styles.controls__optionsButton}>
            <Icon id={iconIds.dots} fill='#E5E5E5' width='2em' height='2em' blockName={blockName}/>
          </button>
          <button className={styles.controls__volumeButton}>
            <Icon id={iconIds.mid} fill='#E5E5E5' width='2.5em' height='2.5em' blockName={blockName}/>
          </button>
          <button className={styles.controls__shuffleButton}>
            <Icon id={iconIds.shuffle} fill='#E5E5E5' width='2em' height='2em' blockName={blockName}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Controls;