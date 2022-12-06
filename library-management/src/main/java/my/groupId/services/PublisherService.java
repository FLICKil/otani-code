package my.groupId.services;

import java.util.List;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import my.groupId.handleException.HandleNullValue;
import my.groupId.handleException.Message;
import my.groupId.models.Publisher;
import my.groupId.queries.PublisherQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PublisherService {
  @Autowired PublisherQuery publisherQuery;

  public Response getPublisher() {
    try {
      List<Publisher> publishers = publisherQuery.queryGetPublisher();
      return Response.ok(publishers).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response getPublisher(Long id) {
    try {
      Publisher publisher = publisherQuery.queryGetPublisher(id);

      if (publisher == null) throw new HandleNullValue("This publisher is not exist");

      return Response.ok(publisher).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response createPublisher(Publisher publisher) {
    try {
      if (!publisherQuery.queryCreatePublisher(publisher))
        throw new HandleNullValue("This publisher is already existed");
      return Response.ok(new Message("Publisher is successful created")).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response updatePublisher(Long id, Publisher publisher) {
    try {
      if (!publisherQuery.queryUpdatePublisher(id, publisher))
        throw new HandleNullValue("This publisher is not existed");
      return Response.ok(new Message("Publisher is successful modified")).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response deletePublisher(Long id) {
    try {
      int result = publisherQuery.queryDeletePublisher(id);
      if (result == 0) throw new HandleNullValue("This publisher is not exist");
      else if (result == 2)
        throw new HandleNullValue("Cannot delete publisher that is already in use.");

      return Response.ok(new Message("Publisher is deleted")).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }
}
