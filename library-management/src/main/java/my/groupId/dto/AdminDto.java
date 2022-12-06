package my.groupId.dto;

import java.time.LocalDateTime;

public class AdminDto {

  public record AdminR(
      Long id,
      String name,
      LocalDateTime createdAt,
      LocalDateTime updatedAt,
      Long createdBy,
      Long updatedBy) {}
}
