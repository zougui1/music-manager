import { useState, useEffect } from 'react';
import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory } from '@capacitor/core';

const PHOTO_STORAGE = 'photos';

export const usePhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { getPhoto } = useCamera();
  const { deleteFile, getUri, readFile, writeFile } = useFilesystem();
  const { get, set } = useStorage();

  const takePhoto = async () => {
    const cameraPhoto = await getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    const filename = new Date().getTime() + '.jpeg';
    const newPhotos = [
      {
        filepath: filename,
        webviewPath: cameraPhoto.webPath,
      },
      ...photos,
    ];
    setPhotos(newPhotos);
    set(PHOTO_STORAGE, JSON.stringify(newPhotos));
  }

  const savePicture = async () => {
    const data = 'something';
    set(PHOTO_STORAGE, data);
    const savedFile = await writeFile({
      path: 'something.txt',
      data,
      directory: FilesystemDirectory.Data,
    });
    return savedFile;
  }

  useEffect(() => {
    const loadSaved = async () => {
      await savePicture();
      const photosString = await get(PHOTO_STORAGE);
      const photos = photosString;
      /*const photos = (photosString ? JSON.parse(photosString) : []) as Photo[];

      for (const photo of photos) {
        const file = await readFile({
          path: photo.filepath,
          directory: FilesystemDirectory.Data,
        });
        photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
      }*/
      console.log(photos)
      //setPhotos(photos);
    }
    loadSaved();
  }, [get, readFile]);

  return {
    photos,
    takePhoto,
    readFile: async () => {
      //const file = await readFile({ directory: FilesystemDirectory.Documents, path: './some.txt' });
      //console.log(file)
    },
  };
}

export interface Photo {
  filepath: string;
  webviewPath?: string;
}
