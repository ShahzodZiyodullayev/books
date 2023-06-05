import {
  Box,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import noPhoto from "../assets/noPhoto.jpg";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import booksService from "../service/books";
import { useDispatch, useSelector } from "react-redux";
import { isRefresh } from "../reducers/booksReducer";
import { setSnack } from "../reducers/snackbarReducer";

interface BookCardProps {
  book: {
    cover: string;
    title: string;
    author: string;
    isbn: string;
    published: string;
    pages: string | null | undefined;
    id: number | null | undefined;
    status: number | null | undefined;
  };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  // height: { md: "300px", xs: "auto" },
}));

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("lg"));
  const { auth } = useSelector((state: any) => state);

  const handleDelete = (e: number | null | undefined) => {
    if (e !== null && e !== undefined) {
      booksService
        .deleteBook({
          url: `books/${e}`,
          method: "DELETE",
          body: { key: auth.user.key, secret: auth.user.secret },
        })
        .then((a: any) => {
          if (a?.isOk) {
            dispatch(setSnack({ title: "Deleted", color: "success" }));
          } else {
            dispatch(
              setSnack({ title: a?.response?.data?.message, color: "error" }),
            );
          }
        })
        .then(() => dispatch(isRefresh()));
    }
  };

  const handleEdit = (e: number, id: number | null | undefined) => {
    if (id !== null && id !== undefined) {
      booksService
        .editBook({
          url: `books/${id}`,
          method: "PATCH",
          data: { status: e },
          body: { key: auth.user.key, secret: auth.user.secret },
        })
        .then((a: any) => {
          if (a?.isOk) {
            dispatch(setSnack({ title: "Edited", color: "info" }));
          } else {
            dispatch(
              setSnack({ title: a?.response?.data?.message, color: "error" }),
            );
          }
        })
        .then(() => dispatch(isRefresh()));
    }
  };

  const handleAdd = (isbn: string) => {
    booksService
      .createBook({
        url: "books",
        method: "POST",
        data: { isbn },
        body: { key: auth.user.key, secret: auth.user.secret },
      })
      .then((a: any) => {
        if (a?.isOk) {
          dispatch(setSnack({ title: "Added", color: "success" }));
        } else {
          dispatch(
            setSnack({ title: a?.response?.data?.message, color: "error" }),
          );
        }
      });
  };

  return (
    <Item>
      <Grid
        container
        columnSpacing={isXs ? 0 : 2}
        sx={{
          height: { lg: "300px", md: "auto", xs: "auto" },
          width: "100%",
        }}
      >
        <Grid
          xs={12}
          md={12}
          lg={5}
          textAlign="start"
          sx={{
            overflow: "hidden",
            height: "100%",
          }}
        >
          <img
            src={book?.cover ? book.cover : noPhoto}
            alt={book?.title}
            height="100%"
            width="100%"
            style={{ objectFit: "cover" }}
          />
        </Grid>
        <Grid
          xs={12}
          md={12}
          lg={7}
          textAlign="start"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ mb: { md: 0, xs: 4 } }}>
            <Typography variant="h5" color="#000" fontWeight={600}>
              {book.title}
            </Typography>

            <Typography variant="h6">Author: {book.author}</Typography>
            <Typography variant="h6">ISBN-13: {book.isbn}</Typography>
            <Typography variant="h6">Published: {book.published}</Typography>
            {book.pages && (
              <Typography variant="h6">{book.pages} pages</Typography>
            )}
          </Box>
          {book?.id !== undefined && book?.status !== undefined ? (
            <Stack spacing={1} direction={"column"}>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
                fullWidth
              >
                {["new", "reading", "finished"].map(
                  (el: any, index: number) => (
                    <Button
                      key={index}
                      disabled={index === book.status}
                      onClick={() => handleEdit(index, book.id)}
                      sx={{
                        "&:disabled": {
                          background: "#1976d2",
                          color: "#fff",
                        },
                        "&:hover": {
                          background: "rgba(0,0,0,0.1)",
                          borderColor: "rgba(0,0,0,0.3)",
                        },
                        color: "rgba(0,0,0,0.5)",
                        borderColor: "rgba(0,0,0,0.3)",
                      }}
                    >
                      {el}
                    </Button>
                  ),
                )}
              </ButtonGroup>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(book.id)}
              >
                Delete
              </Button>
            </Stack>
          ) : (
            <Button
              variant="outlined"
              color="error"
              // sx={{ width: { md: "30%", xs: "50%" } }}
              onClick={() => handleAdd(book.isbn)}
            >
              Add to my books
            </Button>
          )}
        </Grid>
      </Grid>
    </Item>
  );
};

export default BookCard;
