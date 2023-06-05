import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { TextField } from "@mui/material";
import booksService from "../service/books";
import { useDispatch, useSelector } from "react-redux";
import { isRefresh } from "../reducers/booksReducer";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface CreateBookDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreateBookDialog: React.FC<CreateBookDialogProps> = ({
  open,
  setOpen,
}) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: any) => state);
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddBook = () => {
    booksService
      .createBook({
        url: "books",
        method: "POST",
        data: { isbn: value },
        body: { key: auth.user.key, secret: auth.user.secret },
      })
      .then(() => dispatch(isRefresh()))
      .then(() => setOpen(false));
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>"Add a new book to the list"</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Enter the ISBN (International Standard Book Number) to add a new
            book!
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <TextField
            fullWidth
            size="small"
            id="outlined-password-input"
            label="Enter ISBN"
            type="text"
            autoComplete="current-password"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddBook}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateBookDialog;
