import { useEffect, useState } from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import booksService from "../../service/books";
import { useDispatch, useSelector } from "react-redux";
import { setAllBooks } from "../../reducers/booksReducer";

import BookCard from "../../components/BookCard";
import { Link } from "react-router-dom";

const MyBooks = () => {
  const dispatch = useDispatch();
  const { auth, books } = useSelector((state: any) => state);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    booksService
      .getAllBooks({
        url: "books",
        method: "GET",
        body: { key: auth.user.key, secret: auth.user.secret },
      })
      .then((a: any) =>
        dispatch(
          setAllBooks([
            ...a?.data.map((item: any) => {
              return {
                ...item.book,
                status: item.status,
              };
            }),
          ]),
        ),
      );
  }, [books.isRefresh, search]);

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          my: 3,
          width: "100%",
        }}
      >
        <Grid container spacing={3} width="auto" height="100%" my={3}>
          {books?.allBooks?.length ? (
            books?.allBooks?.map((book: any, index: number) => (
              <Grid xs={12} md={6} key={index}>
                <BookCard book={book} />
              </Grid>
            ))
          ) : (
            <Grid
              xs={12}
              md={12}
              height="auto"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" textAlign="center">
                You have no books added yet. To add a book to your library, go
                to the{" "}
                <Link to="search" style={{ textDecoration: "none" }}>
                  "Search books"
                </Link>{" "}
                menu
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default MyBooks;
