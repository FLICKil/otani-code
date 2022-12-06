package my.groupId.controllers;

import javax.ws.rs.core.Response;
import my.groupId.models.Author;
import my.groupId.services.AuthorService;
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
@RequestMapping("/api/author")
public class AuthorController {
  private final AuthorService authorService;

  @Autowired
  public AuthorController(AuthorService authorService) {
    this.authorService = authorService;
  }

  @GetMapping
  public Response getAuthor() {
    return authorService.getAuthor();
  }

  @GetMapping("/{id}")
  public Response getAuthor(@PathVariable Long id) {
    return authorService.getAuthor(id);
  }

  @PostMapping
  public Response createAuthor(@RequestBody Author authorDto) {
    return authorService.createAuthor(authorDto);
  }

  @DeleteMapping("/{id}")
  public Response deleteAuthor(@PathVariable Long id) {
    return authorService.deleteAuthor(id);
  }

  @PatchMapping("/{id}")
  public Response updateAuthor(@PathVariable Long id, @RequestBody Author authorDto) {
    return authorService.updateAuthor(id, authorDto);
  }
}
