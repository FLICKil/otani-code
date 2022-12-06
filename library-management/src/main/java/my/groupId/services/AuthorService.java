package my.groupId.services;

import java.util.List;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import my.groupId.handleException.HandleNullValue;
import my.groupId.handleException.Message;
import my.groupId.models.Author;
import my.groupId.queries.AuthorQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorService {
  @Autowired AuthorQuery authorQuery;

  public Response getAuthor() {
    try {
      List<Author> authors = authorQuery.queryGetAuthor();
      return Response.ok(authors).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response getAuthor(Long id) {
    try {
      Author author = authorQuery.queryGetAuthor(id);

      if (author == null) throw new HandleNullValue("This author is not exist");

      return Response.ok(author).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response createAuthor(Author author) {
    try {
      if (!authorQuery.queryCreateAuthor(author))
        throw new HandleNullValue("This author is already existed");
      return Response.ok(new Message("Author is successful created")).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response updateAuthor(Long id, Author author) {
    try {
      if (!authorQuery.queryUpdateAuthor(id, author))
        throw new HandleNullValue("This author is not existed");
      return Response.ok(new Message("Author is successful modified")).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response deleteAuthor(Long id) {
    try {
      int result = authorQuery.queryDeleteAuthor(id);
      if (result == 0) throw new HandleNullValue("This author is not exist");
      else if (result == 2)
        throw new HandleNullValue("Cannot delete author that is already in use.");
      return Response.ok(new Message("Author is deleted")).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }
}
