import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  AlertTitle,
  Autocomplete,
  TextField,
  Box,
  createFilterOptions,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import api from "../../../api";
import { AuthorContext } from "../../../context/AuthorContext";
import { BookContext } from "../../../context/BookContext";
import { CategoryContext } from "../../../context/CategoryContext";
import { PublisherContext } from "../../../context/PublisherContext";
import { IBook } from "../../../interfaces/IBook.interface";
import { IOption } from "../AdminBook";

interface IModalEditBook {
  keepMounted: boolean;
  open: boolean;
  onClose: Function;
  book: IBook;
  options: Array<IOption[]>;
}

const fileToDataUri = (file: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target?.result);
    };
    reader.readAsDataURL(file);
  });

const ModalEditBook = (props: IModalEditBook) => {
  const { open, onClose, book, options, ...other } = props;
  const [dataUri, setDataUri] = useState<string>("");
  const initImg = book?.coverImg;
  const { listBook, setListBook, reload, setReload } = useContext(BookContext);

  const OPTIONS_LIMIT = 5;
  const filterOptions = createFilterOptions({
    limit: OPTIONS_LIMIT,
  });

  useEffect(() => {
    if (initImg) {
      setDataUri(`data:image/png;base64,` + initImg.toString());
    }
  }, [initImg]);

  const onChange = (file: File | null) => {
    if (!file) {
      setDataUri("");
      return;
    }

    fileToDataUri(file).then((dataUri) => setDataUri(dataUri as string));
  };

  const [error, setError] = useState<string>("");

  const titleRef = useRef<HTMLInputElement>(null);
  const [authorRef, setAuthorRef] = useState<IOption | null>(null);
  const [categoryRef, setCategoryRef] = useState<IOption | null>(null);
  const [publisherRef, setPublisherRef] = useState<IOption | null>(null);

  const amountRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const handleOk = () => {
    if (
      book.title == titleRef.current?.value &&
      (book.author.id == authorRef?.id || authorRef == null) &&
      (book.category.id == categoryRef?.id || categoryRef == null) &&
      (book.publisher.id == publisherRef?.id || publisherRef == null) &&
      book.amount == Number.parseInt(amountRef.current?.value as string) &&
      (initImg?.toString() == dataUri.slice(23, dataUri.length) ||
        dataUri == "")
    ) {
      setDataUri("");
      onClose("Nothing change");
      return;
    }

    api
      .patch(`book/${book.id}`, {
        ...book,
        title: titleRef.current?.value,
        author:
          authorRef == null
            ? book.author
            : { id: authorRef.id, name: authorRef.label },
        category:
          categoryRef == null
            ? book.category
            : { id: categoryRef.id, name: categoryRef.label },
        publisher:
          publisherRef == null
            ? book.publisher
            : { id: publisherRef.id, name: publisherRef.label },
        amount: amountRef.current?.value,
        coverImg: dataUri
          ? dataUri.slice(dataUri.indexOf(",") + 1, dataUri.length)
          : null,
        updatedBy: JSON.parse(localStorage.getItem("adminInfo") as string)?.id,
      })
      .then((res) => {
        setDataUri("");
        onClose("Success: Update book successful");
        setReload(!reload);
      })
      .catch((err) => {
        setDataUri("");
        onClose("Error: " + err.response.data.msg);
      });
  };

  const handleCancel = () => {
    setDataUri("");
    onClose();
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: "800px" } }}
      maxWidth="xl"
      open={open}
    >
      <DialogTitle>Edit Book Detail</DialogTitle>
      <DialogContent dividers sx={{ display: "flex", flexWrap: "wrap" }}>
        <TextField
          defaultValue={book ? book.title : ""}
          sx={{
            marginBottom: "1rem",
            width: { md: "50%", sm: "100%", xs: "100%", xxs: "100%" },
            paddingX: "1rem",
            "& label": { left: "1rem" },
          }}
          autoFocus
          label="Book Title"
          inputRef={titleRef}
          required
        ></TextField>
        <Autocomplete
          aria-required
          disablePortal
          id="author"
          filterOptions={filterOptions}
          options={options[0]}
          onChange={(event, value) => {
            setAuthorRef(value as IOption);
          }}
          sx={{
            marginBottom: "1rem",
            width: { md: "50%", sm: "100%", xs: "100%", xxs: "100%" },
            paddingX: "1rem",
          }}
          defaultValue={
            book
              ? options[0].find((option) => option.id == book.author?.id)
              : ""
          }
          renderInput={(params) => <TextField {...params} label="Author *" />}
        />
        <Autocomplete
          aria-required
          disablePortal
          id="category"
          filterOptions={filterOptions}
          options={options[1]}
          onChange={(event, value) => {
            setCategoryRef(value as IOption);
          }}
          sx={{
            marginBottom: "1rem",
            width: { md: "50%", sm: "100%", xs: "100%", xxs: "100%" },
            paddingX: "1rem",
          }}
          defaultValue={
            book
              ? options[1].find((option) => option.id == book.category?.id)
              : ""
          }
          renderInput={(params) => <TextField {...params} label="Category *" />}
        />
        <Autocomplete
          aria-required
          disablePortal
          id="publisher"
          filterOptions={filterOptions}
          options={options[2]}
          onChange={(event, value) => {
            setPublisherRef(value as IOption);
          }}
          sx={{
            marginBottom: "1rem",
            width: { md: "50%", sm: "100%", xs: "100%", xxs: "100%" },
            paddingX: "1rem",
          }}
          defaultValue={
            book
              ? options[2].find(
                  (option) => option.id == book.publisher?.id
                )
              : ""
          }
          renderInput={(params) => (
            <TextField {...params} label="Publisher *" />
          )}
        />
        <TextField
          defaultValue={book ? book.amount : ""}
          sx={{
            marginBottom: "1rem",
            width: { md: "50%", sm: "100%", xs: "100%", xxs: "100%" },
            paddingX: "1rem",
            "& label": { left: "1rem" },
          }}
          type="number"
          inputRef={amountRef}
          label="Book Amount"
          required
        ></TextField>
        <Box
          sx={{
            marginBottom: "1rem",
            width: { md: "50%", sm: "100%", xs: "100%", xxs: "100%" },
            paddingX: "1rem",
          }}
        >
          <TextField
            inputRef={coverRef}
            type="file"
            onChange={(event: any) => onChange(event.target.files[0] || null)}
            inputProps={{ accept: "image/*" }}
            sx={{ display: "flex", flexDirection: "column" }}
            helperText="Choose a cover image"
          ></TextField>
          {dataUri ? <img src={dataUri} className="w-[200px]"></img> : <></>}
        </Box>

        {error && (
          <Alert severity="error" sx={{ marginTop: "1rem" }}>
            <AlertTitle>Error</AlertTitle>
            <strong>{error}</strong>
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          autoFocus
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={handleOk}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEditBook;
