package my.groupId.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class RentDto {
  public record RentR(
      Long id,
      Book book,
      User user,
      LocalDate startDate,
      LocalDate endDate,
      BigDecimal fines,
      LocalDateTime createdAt,
      LocalDateTime updatedAt,
      Long createdBy,
      Long updatedBy) {}

  public record Book(
      Long id, String title, Author author, Category category, Publisher publisher) {}

  public record Author(String name) {}

  public record Category(String name) {}

  public record Publisher(String name) {}

  public record User(Long id, String name) {}
}
