package my.groupId.controllers;

import javax.ws.rs.core.Response;
import my.groupId.models.Book;
import my.groupId.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/book")
public class BookController {

  private final BookService bookService;

  @Autowired
  public BookController(BookService bookService) {
    this.bookService = bookService;
  }

  @GetMapping
  public Response getBooks() {
    return bookService.getBooks();
  }

  @GetMapping("/{id}")
  public Response getBook(@PathVariable Long id) {
    return bookService.getBook(id);
  }

  //  @GetMapping
  //  public Response getBookByAuthor(@RequestParam Long author) {
  //    return bookService.getBookByAuthor(author);
  //  }
  //
  //  @GetMapping
  //  public Response getBookByCategory(@RequestParam(name = "category") int category) {
  //    return bookService.getBookByCate(Long.valueOf(category));
  //  }
  //
  //  @GetMapping
  //  public Response getBookByPublisher(@RequestParam Long publisher) {
  //    return bookService.getBookByPublisher(publisher);
  //  }

  @PostMapping
  public Response createBook(@RequestBody Book book) {
    return bookService.createBook(book);
  }

  @PatchMapping("/{id}")
  public Response updateBook(@PathVariable Long id, @RequestBody Book book) {
    return bookService.updateBook(id, book);
  }

  @DeleteMapping("/{id}")
  public Response deleteBook(@PathVariable Long id) {
    return bookService.deleteBook(id);
  }
}
