import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import BookCard from "../../components/BookCard";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import booksService from "../../service/books";
import { setSearchBooks, startStopLoading } from "../../reducers/booksReducer";
import Lottie from "react-lottie";
import data from "../../assets/loader.json";
import { setSnack } from "../../reducers/snackbarReducer";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: data,
};

const SearchBook = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { books, auth } = useSelector((state: any) => state);
  const [search, setSearch] = useState("");
  const isXs = useMediaQuery(theme.breakpoints.down("md"));
  const [content, setContent] =
    useState(`To search for books, enter the name of the book you need in the
  "Search books" input field`);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchClick = (
    event: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>,
  ) => {
    if (
      (event as React.KeyboardEvent).key === "Enter" ||
      event.type === "click"
    ) {
      dispatch(startStopLoading(true));
      booksService
        .searchBook({
          url: `books/${search}`,
          method: "GET",
          body: { key: auth.user.key, secret: auth.user.secret },
        })
        .then((a: any) => {
          if (!a?.isOk) {
            dispatch(
              setSnack({ title: a?.response?.data?.message, color: "error" }),
            );
          }
          return a;
        })
        .then((a: any) => {
          if (!a?.data?.length) {
            setContent("Data not found");
          }
          dispatch(startStopLoading(false));
          dispatch(setSearchBooks(a?.data));
        });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          my: 3,
          width: "100%",
        }}
      >
        <Grid
          spacing={2}
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { md: "row", xs: "column" },
          }}
        >
          <Grid xs={12} md="auto">
            <TextField
              size="small"
              fullWidth={isXs && true}
              id="outlined-password-input"
              label="Search books"
              type="text"
              autoComplete="current-password"
              onChange={handleSearch}
              onKeyDown={handleSearchClick}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon
                      onClick={handleSearchClick}
                      style={{ cursor: "pointer" }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} width="auto" height="100%" my={3}>
          {books.isLoading ? (
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
              <Lottie
                options={defaultOptions}
                width="10%"
                style={{ pointerEvents: "none" }}
              />
            </Grid>
          ) : books?.searchBooks?.length ? (
            books?.searchBooks?.map((book: any, index: number) => (
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
                {content}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default SearchBook;
