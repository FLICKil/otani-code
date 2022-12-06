package my.groupId.services;

import java.util.List;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import my.groupId.dto.AdminDto.AdminR;
import my.groupId.encode.StringEncode;
import my.groupId.handleException.HandleNullValue;
import my.groupId.handleException.Message;
import my.groupId.models.Admin;
import my.groupId.queries.AdminQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

  @Autowired AdminQuery adminQuery;

  public Response getAdmin() {
    try {
      List<Admin> admins = adminQuery.queryGetAdmin();
      return Response.ok(admins).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response getAdmin(Long id) {
    try {
      AdminR admin = adminQuery.queryGetAdmin(id);
      if (admin == null) throw new HandleNullValue("This admin is not exist");
      return Response.ok(admin).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response deleteAdmin(Long id) {
    try {
      if (!adminQuery.queryDeleteAdmin(id)) throw new HandleNullValue("This admin is not exist");
      return Response.ok(new Message("Admin has been deleted")).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response updateAdmin(Long id, Admin admin) {
    try {
      admin.setPassword(new StringEncode(admin.getPassword()).toEncode());
      if (!adminQuery.queryUpdateAdmin(id, admin))
        throw new HandleNullValue("This admin is not exist");
      return Response.ok(adminQuery.queryGetAdmin(id)).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response handleLogin(Admin admin) {
    try {
      admin.setPassword(new StringEncode(admin.getPassword()).toEncode());
      Admin adminLogin = adminQuery.queryGetAdmin(admin.getName(), admin.getPassword());
      if (adminLogin == null) throw new HandleNullValue("Username or password is not correct");
      return Response.ok(adminQuery.queryGetAdmin(adminLogin.getId())).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }
}
