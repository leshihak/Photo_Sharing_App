import { Box, Modal } from "@mui/material";
import PostCreationModal from "components/UI/Modal/PostCreationModal/PostCreationModal";
import { FC, useContext, useEffect, useState } from "react";
import { ModalTypes } from "static/constants";
import { ModalRootContext } from "./ModalRootContext";
import CloseIcon from "@mui/icons-material/Close";
import PostUsersLikeModal from "../PostUsersLikeModal/PostUsersLikeModal";
import ChangeProfilePhotoModal from "../ChangeProfilePhotoModal/ChangeProfilePhotoModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
};

const MODAL_COMPONENTS: Record<number, FC> = {
  [ModalTypes.POST_CREATION_MODAL]: PostCreationModal,
  [ModalTypes.POST_USERS_LIKE_MODAL]: PostUsersLikeModal,
  [ModalTypes.CHANGE_PROFILE_PHOTO_MODAL]: ChangeProfilePhotoModal,
};

const ModalRoot: FC = () => {
  const { modalType, setModalType } = useContext(ModalRootContext);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setModalType(null);
  };

  useEffect(() => {
    if (modalType !== null) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [modalType]);

  const SpecificModal = MODAL_COMPONENTS[modalType!!];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        ".MuiBackdrop-root": {
          backgroundColor: "black",
          opacity: "0.7 !important",
        },
      }}
    >
      <>
        <Box position="absolute" p={1.5} right={0} onClick={handleClose}>
          <CloseIcon
            sx={{ color: "white", width: 40, height: 40, cursor: "pointer" }}
          />
        </Box>
        <Box sx={style}>{SpecificModal ? <SpecificModal /> : null}</Box>
      </>
    </Modal>
  );
};

export default ModalRoot;
