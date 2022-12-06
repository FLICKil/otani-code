package my.groupId.controllers;

import javax.ws.rs.core.Response;
import my.groupId.models.Publisher;
import my.groupId.services.PublisherService;
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
@RequestMapping("/api/publisher")
public class PublisherController {
  private final PublisherService publisherService;

  @Autowired
  public PublisherController(PublisherService publisherService) {
    this.publisherService = publisherService;
  }

  @GetMapping
  public Response getPublisher() {
    return publisherService.getPublisher();
  }

  @GetMapping("/{id}")
  public Response getPublisher(@PathVariable Long id) {
    return publisherService.getPublisher(id);
  }

  @PostMapping
  public Response createPublisher(@RequestBody Publisher publisherDto) {
    return publisherService.createPublisher(publisherDto);
  }

  @DeleteMapping("/{id}")
  public Response deletePublisher(@PathVariable Long id) {
    return publisherService.deletePublisher(id);
  }

  @PatchMapping("/{id}")
  public Response updatePublisher(@PathVariable Long id, @RequestBody Publisher publisherDto) {
    return publisherService.updatePublisher(id, publisherDto);
  }
}
