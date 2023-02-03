import { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApiData, useApiGetPost } from '../../lib/api';
import { formattedTime } from '../../lib/format';
import { ImageWithDesc, Post } from '../../lib/types';
import { RootState, useAppSelector } from '../../store';
import styles from './Thumbnail.module.scss';

export default function Thumbnail({
  file,
  fileReader,
  newFilesWithDesc,
  setNewFilesWithDesc,
  desc,
  index,
}: {
  file: File;
  fileReader: FileReader;
  newFilesWithDesc: ImageWithDesc[];
  setNewFilesWithDesc: React.Dispatch<React.SetStateAction<ImageWithDesc[]>>;
  desc: string;
  index: number;
}) {
  const [url, setUrl] = useState<string | ArrayBuffer | null>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [description, setDescription] = useState(desc);

  fileReader.onload = () => {
    setUrl(fileReader.result);
  };

  const handleAddDescription = () => {
    console.log(description);
    setNewFilesWithDesc([
      ...newFilesWithDesc.slice(0, index),
      {
        file: file,
        description: description,
      },
      ...newFilesWithDesc.slice(index + 1),
    ]);
    console.log(newFilesWithDesc.map((image) => image.description));
    setModalOpen(false);
  };

  return (
    <>
      <li
        className={styles['thumbnail-attached']}
        style={
          url === ''
            ? {
                background: 'transparent url(../../resources/loading.svg) no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: '24px 24px',
              }
            : { backgroundImage: `url(${url})` }
        }
        onClick={() => setModalOpen(true)}
      ></li>
      {modalOpen && <div className={styles['modal-wrap']}></div>}
      {modalOpen && (
        <div id='attachThumbnailForm' className={styles['modal']}>
          <div title='닫기' className={styles['close']} onClick={() => setModalOpen(false)}></div>
          <h3>첨부된 이미지</h3>
          <p>
            <label>설명 추가</label>
            <textarea
              name='caption'
              className={styles['text']}
              placeholder='이 이미지에 대한 설명을 입력하세요.'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </p>
          <input
            type='button'
            value='첨부 삭제'
            className={styles['button-delete']}
            onClick={() => setModalOpen(false)}
          />
          <input
            type='submit'
            value='설명 저장'
            className={styles['button-save']}
            onClick={handleAddDescription}
          />
        </div>
      )}
    </>
  );
}
