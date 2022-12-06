package my.groupId.controllers;

import javax.ws.rs.core.Response;
import my.groupId.models.Admin;
import my.groupId.services.AdminService;
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
@RequestMapping("/api/admin")
public class AdminController {
  private final AdminService adminService;

  @Autowired
  public AdminController(AdminService adminService) {
    this.adminService = adminService;
  }

  @GetMapping
  public Response getAdmin() {
    return adminService.getAdmin();
  }

  @GetMapping("/{id}")
  public Response getAdmin(@PathVariable Long id) {
    return adminService.getAdmin(id);
  }

  @PostMapping("/login")
  public Response handleLogin(@RequestBody Admin adminDto) {
    return adminService.handleLogin(adminDto);
  }

  @PatchMapping("/{id}")
  public Response updateAdmin(@PathVariable Long id, @RequestBody Admin adminDto) {
    return adminService.updateAdmin(id, adminDto);
  }

  @DeleteMapping("/{id}")
  public Response deleteAdmin(@PathVariable Long id) {
    return adminService.deleteAdmin(id);
  }
}
