package my.groupId.controllers;

import javax.ws.rs.core.Response;
import my.groupId.models.Rent;
import my.groupId.models.Users;
import my.groupId.services.RentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rent")
public class RentController {
  private final RentService rentService;

  @Autowired
  public RentController(RentService rentService) {
    this.rentService = rentService;
  }

  @GetMapping
  public Response getRents() {
    return rentService.getRents();
  }

  @GetMapping("/{id}")
  public Response getRent(@PathVariable Long id) {
    return rentService.getRent(id);
  }

  @GetMapping("/user")
  public Response getUserRent(@RequestBody Users user) {
    return rentService.getUserRent(user);
  }

  @GetMapping("/user/{id}")
  public Response getUserRent(@PathVariable Long id, @RequestBody Users user) {
    return rentService.getUserRent(id, user);
  }

  @PostMapping
  public Response createRent(@RequestBody Rent rent) {
    return rentService.createRent(rent);
  }

  @PatchMapping("/{id}")
  public Response updateRent(@PathVariable Long id, @RequestBody Rent rent) {
    return rentService.updateRent(id, rent);
  }
}
