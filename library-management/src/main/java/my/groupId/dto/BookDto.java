package my.groupId.dto;

import java.time.LocalDateTime;

public class BookDto {
  public record BookR(
      Long id,
      String title,
      Author author,
      Category category,
      Publisher publisher,
      int amount,
      byte[] coverImg,
      LocalDateTime createdAt,
      LocalDateTime updatedAt,
      Long createdBy,
      Long updatedBy) {}

  public record Author(Long id, String name) {}

  public record Category(Long id, String name) {}

  public record Publisher(Long id, String name) {}
}
