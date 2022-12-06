package my.groupId.dto;

import java.time.LocalDateTime;

public class UserDto {

  public record User(
      Long id,
      String name,
      String email,
      boolean active,
      LocalDateTime createdAt,
      LocalDateTime updatedAt,
      Long createdBy,
      Long updatedBy) {}
}
