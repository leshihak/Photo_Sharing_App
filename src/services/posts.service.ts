import { ref as reference, push, set, remove } from "firebase/database";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { DataBaseModel } from "models/service.model";
import { db, storage } from "./../config/firebase";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction } from "react";
import { getTime } from "date-fns";
import { FileTypes, FILE_TYPES } from "static/constants";

export const setPostToUserToDB = (
  userId: string | undefined,
  data: File[] | null,
  setStep: Dispatch<SetStateAction<number>>
) =>
  data?.forEach((file) => {
    const storageRef = ref(storage, `/posts/${file.name}`);
    const uploadFile = uploadBytesResumable(storageRef, file);
    const type = FILE_TYPES.image.includes(file.type)
      ? FileTypes.PHOTOS
      : FileTypes.VIDEOS;

    uploadFile.on(
      "state_changed",
      null,
      (error) => toast.error(error),
      () => {
        getDownloadURL(uploadFile.snapshot.ref).then((url) => {
          push(reference(db, `${DataBaseModel.POSTS}/${userId}/${type}/`), {
            alt: file.name,
            url,
            comments: [],
            userIdsWhoLikedPost: [],
            createdAt: getTime(new Date()),
          });
          return url;
        });
        setStep(4);
      }
    );
  });

export const toggleLikeToPost = (
  userId: string,
  postId: string,
  isLiked: boolean
) => {
  const ref = reference(
    db,
    `${DataBaseModel.POSTS}/${userId}/photos/${postId}/userIdsWhoLikedPost/${userId}`
  );

  isLiked ? remove(ref) : set(ref, userId);
};

export const setCommentToPost = (
  userId: string,
  postId: string,
  comment: string
) => {
  const ref = reference(
    db,
    `${DataBaseModel.POSTS}/${userId}/photos/${postId}/comments`
  );

  push(ref, {
    createdAt: getTime(new Date()),
    text: comment,
    userId,
  });
};
