package my.groupId.services;

import java.util.List;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import my.groupId.dto.UserDto.User;
import my.groupId.encode.StringEncode;
import my.groupId.handleException.HandleNullValue;
import my.groupId.handleException.Message;
import my.groupId.models.Users;
import my.groupId.queries.UserQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired UserQuery userQuery;

  public Response getAllUsers() {
    try {
      List<Users> users = userQuery.queryGetAllUsers();

      return Response.ok(users).build();

    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response getUser(Long id) {
    try {
      User user = userQuery.queryGetUser(id);
      if (user == null) {
        throw new HandleNullValue("This user does not exist!");
      }
      return Response.ok(user).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response deleteUser(Long id) {
    try {
      if (!userQuery.queryDeleteUser(id)) {
        throw new HandleNullValue("This user is not exist");
      }
      return Response.ok(new Message("User has been delete")).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response updateUser(Long id, Users user) {
    try {
      if (user.getPassword() != null) {
        user.setPassword(new StringEncode(user.getPassword()).toEncode());
        if (!userQuery.queryUpdateUser(id, user) || !userQuery.queryUpdateUserPassword(id, user))
          throw new HandleNullValue("This user is not exist");
      } else if (!userQuery.queryUpdateUser(id, user))
        throw new HandleNullValue("This user is not exist");
      return Response.ok(userQuery.queryGetUser(id)).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response getUserPassword(Long id) {
    try {
      var user = userQuery.queryGetUserPassword(id);
      if (user == null) throw new HandleNullValue("This user is not exist");
      return Response.ok(user).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response updateUserPassword(Long id, Users user) {
    try {
      user.setPassword(new StringEncode(user.getPassword()).toEncode());
      boolean result = userQuery.queryUpdateUserPassword(id, user);
      if (!result) throw new HandleNullValue("This user is not exist");
      return Response.ok(new Message("User password has been updated")).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response handleLogin(Users user) {
    try {
      user.setPassword(new StringEncode(user.getPassword()).toEncode());
      Users userLogin = userQuery.queryGetUser(user.getEmail(), user.getPassword());
      if (userLogin == null) throw new HandleNullValue("Account or password is incorrect");
      return Response.ok(userQuery.queryGetUser(userLogin.getId())).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }

  public Response handleSignup(Users user) {
    try {
      user.setPassword(new StringEncode(user.getPassword()).toEncode());
      if (!userQuery.queryCreateUser(user)) throw new HandleNullValue("Email has already existed");
      return Response.ok(new Message("Register success")).build();
    } catch (Exception e) {
      return Response.status(Status.BAD_REQUEST).entity(new Message(e.getMessage())).build();
    }
  }
}
