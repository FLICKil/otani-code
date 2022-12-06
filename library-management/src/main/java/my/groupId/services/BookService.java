package my.groupId.services;

import java.util.List;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import my.groupId.dto.BookDto.BookR;
import my.groupId.handleException.HandleNullValue;
import my.groupId.handleException.Message;
import my.groupId.models.Book;
import my.groupId.queries.BookQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {
  @Autowired BookQuery bookQuery;
  //
  //  //      try{
  //  //
  //  //    return Response.ok().build();
  //  //  } catch (Exception e){
  //  //    return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
  //  //  }
  //
  public Response getBooks() {
    try {
      List<BookR> books = bookQuery.queryGetBooks();
      return Response.ok(books).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response getBook(Long id) {
    try {
      BookR book = bookQuery.queryGetBook(id);
      if (book == null) throw new HandleNullValue("This book is not exist");
      return Response.ok(book).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response getBookByCate(Long id) {
    try {
      List<BookR> books = bookQuery.queryGetBookByCate(id);
      return Response.ok(books).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response getBookByAuthor(Long id) {
    try {
      List<BookR> books = bookQuery.queryGetBookByAuthor(id);
      return Response.ok(books).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response getBookByPublisher(Long id) {
    try {
      List<BookR> books = bookQuery.queryGetBookByPublisher(id);
      return Response.ok(books).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response createBook(Book book) {
    try {
      if (!bookQuery.queryCreateBook(book)) throw new HandleNullValue("This book is already exist");
      return Response.ok(bookQuery.queryGetBook(book.getTitle())).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response updateBook(Long id, Book book) {
    try {
      int result = bookQuery.queryUpdateBook(id, book);
      if (result == 0) throw new HandleNullValue("This book is not exist");
      else if (result == 2) throw new HandleNullValue("This book is already in the library");
      return Response.ok(bookQuery.queryGetBook(id)).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response deleteBook(Long id) {
    try {
      int result = bookQuery.queryDeleteBook(id);
      if (result == 0) throw new HandleNullValue("This book is not exist");
      else if (result == 2) throw new HandleNullValue("Cannot delete book that is already in use.");
      return Response.ok(new Message("The book is deleted")).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }
}
