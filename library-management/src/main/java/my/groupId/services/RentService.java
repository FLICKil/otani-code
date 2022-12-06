package my.groupId.services;

import java.util.List;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import my.groupId.dto.RentDto.RentR;
import my.groupId.handleException.HandleNullValue;
import my.groupId.handleException.Message;
import my.groupId.models.Rent;
import my.groupId.models.Users;
import my.groupId.queries.RentQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RentService {
  @Autowired RentQuery rentQuery;

  public Response getRents() {
    try {
      List<RentR> rent = rentQuery.queryGetRent();
      return Response.ok(rent).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response getRent(Long id) {
    try {
      RentR result = rentQuery.queryGetRent(id);
      if (result == null) throw new HandleNullValue("There is no issued book with this ID");
      return Response.ok(result).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response createRent(Rent rent) {
    try {
      int result = rentQuery.queryCreateRent(rent);
      if (result == 0) throw new HandleNullValue("This user issued book is exceed limited");
      else if (result == 2) throw new HandleNullValue("This book is not available");
      else if (result == 3) throw new HandleNullValue("This user is not exist");
      else if (result == 4) throw new HandleNullValue("This book is not exist");
      return Response.ok(rentQuery.queryGetRent(rentQuery.queryGetLastestId())).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response updateRent(Long id, Rent rent) {
    try {
      if (!rentQuery.queryUpdateRent(id, rent))
        throw new HandleNullValue("This issued book is not exist");
      return Response.ok(rentQuery.queryGetRent(id)).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response getUserRent(Users user) {
    try {
      if (rentQuery.queryUserGetRent(user) == null)
        throw new HandleNullValue("This user has no issued book");
      return Response.ok(rentQuery.queryUserGetRent(user)).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response getUserRent(Long id, Users user) {
    try {
      if (rentQuery.queryUserGetRent(id, user) == null)
        throw new HandleNullValue("This user don't have this issued book");
      return Response.ok(rentQuery.queryUserGetRent(id, user)).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }
}
