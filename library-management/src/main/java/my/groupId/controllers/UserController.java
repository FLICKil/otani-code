package my.groupId.controllers;

import javax.ws.rs.core.Response;
import my.groupId.models.Users;
import my.groupId.services.UserService;
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
@RequestMapping("/api/users")
public class UserController {
  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping
  public Response getAllUsers() {
    return userService.getAllUsers();
  }

  @GetMapping("/{id}")
  public Response getUser(@PathVariable Long id) {
    return userService.getUser(id);
  }

  @DeleteMapping("/{id}")
  public Response deleteUser(@PathVariable Long id) {
    return userService.deleteUser(id);
  }

  @PatchMapping("/{id}")
  public Response updateUser(@PathVariable Long id, @RequestBody Users userDto) {
    return userService.updateUser(id, userDto);
  }

  @PostMapping("/login")
  public Response handleLogin(@RequestBody Users user) {
    return userService.handleLogin(user);
  }

  @PostMapping("/register")
  public Response handleSignup(@RequestBody Users user) {
    return userService.handleSignup(user);
  }

  @PatchMapping("/{id}/pass")
  public Response updateUserPassword(@PathVariable Long id, @RequestBody Users users){
    return userService.updateUserPassword(id,users);
  }
}
