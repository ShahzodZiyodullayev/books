import {
  Box,
  Button,
  ButtonGroup,
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
import { useState } from "react";

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
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "0 0 60px -30px #999",
  borderRadius: 15,
}));

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));
  const isSm = useMediaQuery(theme.breakpoints.down("md"));
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const { auth } = useSelector((state: any) => state);
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const imageStyles: React.CSSProperties = {
    objectFit: "cover",
    transition: "transform 0.3s ease-in-out",
    transform: isHovered ? "scale(1.2) rotate(5deg)" : "scale(1) rotate(0deg)",
    cursor: "pointer",
    height: "100%",
    width: "100%",
  };

  const handleImageError = () => {
    setError(true);
  };

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
        columnSpacing={isMd ? 2 : isSm ? 0 : isXs ? 0 : 2}
        sx={{
          height: { lg: "320px", md: "auto", xs: "auto" },
          width: "auto",
        }}
      >
        <Grid
          xs={12}
          sm={6}
          md={12}
          lg={5}
          textAlign="start"
          sx={{
            overflow: "hidden",
            height: "100%",
          }}
        >
          <Box
            height="inherit"
            sx={{ overflow: "hidden", borderRadius: 3, display: "flex" }}
          >
            {error ? (
              <img
                src={noPhoto}
                alt={book?.title}
                style={imageStyles}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            ) : (
              <img
                src={book?.cover && book.cover}
                onError={handleImageError}
                alt={book?.title}
                style={imageStyles}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            )}
          </Box>
        </Grid>
        <Grid
          xs={12}
          sm={6}
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

            {(book.author !== undefined || book.author !== null) && (
              <Typography variant="h6">Author: {book.author}</Typography>
            )}
            {(book.isbn !== undefined || book.isbn !== null) && (
              <Typography variant="h6">ISBN-13: {book.isbn}</Typography>
            )}
            {(book.published !== undefined || book.published !== null) && (
              <Typography variant="h6">Published: {book.published}</Typography>
            )}
            {(book.pages !== undefined || book.pages !== null) && (
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
